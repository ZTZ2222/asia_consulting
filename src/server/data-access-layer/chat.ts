"use server"

import { redirect } from "@/lib/i18n-navigation"
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
