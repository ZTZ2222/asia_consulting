"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/server"
import { actionClient } from "@/server/actions/safe-action"
import { pusherServer } from "@/server/pusher"
import { chatDeleteSchema, messageCreateSchema } from "@/types/chat.schema"

export const sendMessage = actionClient
  .schema(messageCreateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    let chatId = parsedInput.chatId

    // Fetch chatId from cookies if not provided in the input
    if (!chatId) {
      chatId = cookies().get("chatId")?.value

      if (!chatId) {
        chatId = uuidv4()
        cookies().set("chatId", chatId)
      }
    }

    try {
      const chatExists = await db.chat.findUnique({
        where: { chatId },
      })

      if (!chatExists) {
        await db.chat.create({
          data: { chatId },
        })
      }
      const savedMessage = await db.message.create({
        data: { ...parsedInput, chatId },
      })

      pusherServer.trigger(chatId, "upcoming-message", savedMessage)
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
