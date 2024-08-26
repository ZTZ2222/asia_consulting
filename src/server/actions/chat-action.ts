"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/server"
import { actionClient } from "@/server/actions/safe-action"
import { pusherServer } from "@/server/pusher"
import {
  chatDeleteSchema,
  messageCreateSchema,
  type zChatRead,
} from "@/types/chat.schema"

export const getOrCreateChat = actionClient.action(
  async (): Promise<zChatRead | null> => {
    let chatId
    chatId = cookies().get("chatId")?.value

    if (!chatId) {
      chatId = uuidv4()
      cookies().set("chatId", chatId)
      try {
        const chat = await db.chat.create({
          data: { chatId },
          include: { messages: true },
        })
        return chat
      } catch (error) {
        console.log(error)
        return null
      }
    } else {
      try {
        const chat = await db.chat.findUnique({
          where: { chatId },
          include: { messages: true },
        })

        return chat
      } catch (error) {
        console.log(error)
        return null
      }
    }
  },
)

export const sendMessage = actionClient
  .schema(messageCreateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      const chat = await db.chat.upsert({
        where: { chatId: parsedInput.chatId },
        create: {
          chatId: parsedInput.chatId,
          messages: {
            create: {
              content: parsedInput.content,
              sender: parsedInput.sender,
            },
          },
        },
        update: {
          messages: {
            create: {
              content: parsedInput.content,
              sender: parsedInput.sender,
            },
          },
        },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
          },
        },
      })

      pusherServer.trigger(chat.chatId, "support-chat", chat)
      return { success: t("Server.actions.success-send-message") }
    } catch (error) {
      console.log(error)
      return { error: t("Server.actions.error") }
    }
  })

export const clearChat = actionClient
  .schema(chatDeleteSchema)
  .action(async ({ parsedInput: { chatId } }) => {
    const t = await getTranslations()
    try {
      await db.chat.delete({ where: { chatId } })
      revalidatePath("/admin/chat")
      return { success: t("Server.actions.success-delete") }
    } catch (error) {
      console.log(error)
      return { error: t("Server.actions.error") }
    }
  })
