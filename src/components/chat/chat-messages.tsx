"use client"

import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import BottomScroller from "@/components/chat/bottom-scroller"
import { pusherClient } from "@/server/pusher"
import { zMessageRead } from "@/types/chat.schema"

interface ChatProps {
  initialMessages: zMessageRead[]
  chatId: string
}

export function ChatMessages({ initialMessages, chatId }: ChatProps) {
  const [messages, setMessages] = useState<zMessageRead[]>(
    initialMessages || [],
  )

  useEffect(() => {
    pusherClient.subscribe(chatId)
    pusherClient.bind("support-chat", (data: zMessageRead) => {
      setMessages(prev => [...prev, data])
    })

    return () => pusherClient.unsubscribe(chatId)
  }, [chatId])
  return (
    <AnimatePresence>
      <ScrollArea className="h-[59vh] md:h-[56vh] lg:h-[50vh]">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: "spring",
                bounce: 0.3,
                duration: messages.indexOf(message) * 0.05 + 0.2,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className={cn(
              "flex flex-col gap-2 whitespace-pre-wrap p-3",
              message.sender === "SUPPORT" ? "items-end" : "items-start",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "max-w-xs overflow-hidden rounded-md px-[18px] pb-1.5 pt-3 font-light",
                  "rounded-[16px] bg-gray-100",
                  message.sender === "SUPPORT"
                    ? "rounded-br-none"
                    : "rounded-tl-none",
                )}
              >
                {message.content}
                <p className={cn("mt-1 text-xs", "text-gray-500")}>
                  {format(new Date(message.createdAt), "HH:mm")}
                </p>
              </span>
            </div>
          </motion.div>
        ))}
        <BottomScroller dependencies={messages} />
      </ScrollArea>
    </AnimatePresence>
  )
}
