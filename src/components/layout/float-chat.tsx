"use client"

import React from "react"
import { PopoverClose } from "@radix-ui/react-popover"
import { MessageSquareMore } from "lucide-react"
import { Send, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function FloatChat() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="fixed bottom-4 right-4 z-10 rounded-[12px] border border-red-650 p-3 transition-transform hover:scale-105"
        >
          <MessageSquareMore className="text-red-650" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <Card className="border-red-550 w-80 -translate-x-2.5 overflow-hidden rounded-xl p-0 shadow-lg">
          <CardHeader className="bg-gray-25 flex flex-row items-center justify-between space-y-0 p-4">
            <div className="flex items-center space-x-2">
              <Avatar className="size-10">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Manager"
                />
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
            <div className="space-y-4 text-sm">
              <div className="rounded-lg bg-muted p-3">
                <p className="">
                  Здравствуйте! Меня зовут ..., менеджер компании "Азия
                  Консалтинг Компани". Чтобы записаться на консультацию вам
                  нужно предоставить информацию о вашем проекте.
                </p>
              </div>
              <div className="ml-auto max-w-[80%] rounded-lg bg-primary p-3 text-primary-foreground">
                <p className="">
                  Пожалуйста, опишите свой проект в одном сообщении
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="mb-2">1. Название проекта</p>
                <p className="">
                  2. Действующий ли у вас бизнес проект или проект на стадии
                  идеи?
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <form
              onSubmit={e => e.preventDefault()}
              className="flex w-full items-center gap-3"
            >
              <Input
                type="text"
                placeholder="Напишите сообщение"
                className="min-h-11 flex-grow"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0 bg-gradient-to-r from-red-650 to-gray-950 text-white hover:opacity-75"
              >
                <Send className="size-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
