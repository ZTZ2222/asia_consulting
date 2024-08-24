"use server"

import { cookies } from "next/headers"
import { db } from "@/server"
import type { zChatRead } from "@/types/chat.schema"

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

export async function getChatById(chatId?: string): Promise<zChatRead | null> {
  if (!chatId) {
    chatId = cookies().get("chatId")?.value
  }
  try {
    const chat = await db.chat.findFirst({
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
    return null
  }
}
