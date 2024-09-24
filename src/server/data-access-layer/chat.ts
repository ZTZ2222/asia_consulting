"use server"

import { redirect } from "@/lib/i18n-navigation"
import { db } from "@/server"
import type { zChatRead } from "@/types/chat.schema"

/**
 * Retrieves all chats from the database, including the most recent message for each chat.
 * @returns {Promise<zChatRead[] | null>} A promise that resolves to an array of chat objects with their latest messages, or null if an error occurs.
 */
export async function getAllChats(): Promise<zChatRead[] | null> {
  try {
    const chats = await db.chat.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    })
    return chats
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Retrieves a chat by its ID from the database
 * @param {string} chatId - The unique identifier of the chat to retrieve
 * @returns {Promise<zChatRead | null>} A Promise that resolves to the chat object if found, or null if an error occurs
 */
export async function getChatById(chatId: string): Promise<zChatRead | null> {
  try {
    const chat = await db.chat.findFirstOrThrow({
      where: { chatId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    })
    return chat
  } catch (error) {
    console.log(error)
    redirect("/admin/chat")
    return null
  }
}
