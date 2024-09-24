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
  /**
   * Retrieves or creates a chat session
   * @returns {Promise<zChatRead | null>} A Promise that resolves to the chat object or null if an error occurs
   */
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
/**
 * Handles an action to upsert a chat message and trigger a real-time update
 * @param {Object} parsedInput - The parsed input containing chat details
 * @param {string} parsedInput.chatId - The unique identifier for the chat
 * @param {string} parsedInput.content - The content of the message
 * @param {string} parsedInput.sender - The sender of the message
 * @returns {Promise<Object>} An object indicating success or error status
 */
)

export const sendMessage = actionClient
  .schema(messageCreateSchema)
  /**
   * Handles a chat message action by upserting the chat and message in the database and triggering a Pusher event.
   * @param {Object} options - The options object.
   * @param {Object} options.parsedInput - The parsed input object.
   * @param {string} options.parsedInput.chatId - The ID of the chat.
   * @param {string} options.parsedInput.content - The content of the message.
   * @param {string} options.parsedInput.sender - The sender of the message.
   * @returns {Promise<Object>} An object indicating the success or error status of the operation.
   */
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
  ```
  /**
   * Deletes a chat from the database based on the provided chat ID.
   * @param {Object} options - The options object.
   * @param {string} options.parsedInput.chatId - The ID of the chat to be deleted.
   * @returns {Promise<Object>} An object indicating the success or failure of the deletion operation.
   */
  ```
  })

export const clearChat = actionClient
  .schema(chatDeleteSchema)
  /**
   * Deletes a chat from the database based on the provided chatId
   * @param {Object} options - The options object
   * @param {string} options.parsedInput.chatId - The unique identifier of the chat to be deleted
   * @returns {Promise<Object>} An object indicating the success or failure of the deletion operation
   */
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
