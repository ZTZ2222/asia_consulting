"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PopoverClose } from "@radix-ui/react-popover"
import { Loader2, MessageSquareMore } from "lucide-react"
import { Send, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import BottomScroller from "@/components/chat/bottom-scroller"
import { getOrCreateChat, sendMessage } from "@/server/actions/chat-action"
import { pusherClient } from "@/server/pusher"
import {
  messageCreateSchema,
  type zChatRead,
  type zMessageCreate,
  type zMessageRead,
} from "@/types/chat.schema"

export default function FloatChat() {
  const form = useForm<zMessageCreate>({
    resolver: zodResolver(messageCreateSchema),
    defaultValues: {
      content: "",
      sender: "CUSTOMER",
    },
  })

  const [chatId, setChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<zMessageRead[]>([])

  useEffect(() => {
    if (chatId) {
      pusherClient.subscribe(chatId)
      pusherClient.bind("support-chat", (data: zChatRead) => {
        setMessages(prev => [...prev, data.messages[0]])
      })
    }

    return () => {
      if (chatId) {
        pusherClient.unsubscribe(chatId)
      }
    }
  }, [chatId])

  const { execute: handleOpenChat, isExecuting: chatIsLoading } = useAction(
    getOrCreateChat,
    {
      onSuccess(data) {
        if (data.data?.chatId) {
          setChatId(data.data?.chatId)
          form.setValue("chatId", data.data?.chatId)
        }
        if (data.data?.messages && data.data?.messages.length > 0) {
          setMessages(data.data?.messages)
        }
      },
    },
  )
  const { execute, isExecuting } = useAction(sendMessage)
  const onSubmit = (data: zMessageCreate) => {
    execute(data)
    form.resetField("content")
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="fixed bottom-4 right-4 z-10 rounded-[12px] border border-red-650 p-3 transition-transform hover:scale-105"
          onClick={() => handleOpenChat()}
        >
          <MessageSquareMore className="text-red-650" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <Card className="w-80 -translate-x-2.5 overflow-hidden rounded-xl border-red-550 p-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-25 p-4">
            <div className="flex items-center space-x-2">
              <Avatar className="size-10">
                <AvatarImage src="/assets/placeholder-user.jpg" alt="Manager" />
                <AvatarFallback className="bg-blue-950 text-white">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="text-blue-950">
                <h2 className="text-lg font-medium leading-6">Фамилия Имя</h2>
                <p className="text-sm">Менеджер</p>
              </div>
            </div>
            <PopoverClose>
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </PopoverClose>
          </CardHeader>
          <CardContent className="h-72 overflow-y-auto px-6 pt-3">
            <div className="relative flex flex-col gap-4 text-sm">
              <div
                key="-1"
                className="max-w-48 self-start rounded-lg bg-gray-100 px-3 py-2"
              >
                Здравствуйте! Меня зовут Имя, менеджер компании &quot;Азия
                Консалтинг Компани&quot;. Чтобы записаться на консультацию вам
                нужно предоставить информацию о вашем проекте. Пожалуйста,
                опишите свой проект в одном сообщении: 1. Название проекта 2.
                Действующий ли у вас бизнес проект или проект на стадии идеи?
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-48 rounded-lg px-3 py-2",
                    message.sender === "CUSTOMER"
                      ? "self-end bg-teal-100"
                      : "self-start bg-gray-100",
                  )}
                >
                  {message.content}
                </div>
              ))}
              <BottomScroller dependencies={messages} />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-center gap-3"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Напишите сообщение"
                          className="min-h-11 flex-grow"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="icon"
                  className="h-11 w-11 shrink-0 bg-gradient-to-r from-red-650 to-gray-950 text-white hover:opacity-75"
                  disabled={isExecuting || chatIsLoading}
                >
                  {chatIsLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Send className="size-5" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
