"use client"

import React, { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SendHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form"
import { sendMessage } from "@/server/actions/chat-action"
import { messageCreateSchema, zMessageCreate } from "@/types/chat.schema"

type Props = {
  chatId: string
  asModal?: boolean
  className?: string
}

const ChatBottombar: React.FC<Props> = ({ chatId, asModal, className }) => {
  const form = useForm<zMessageCreate>({
    resolver: zodResolver(messageCreateSchema),
    defaultValues: {
      chatId: chatId,
      content: "",
      sender: "SUPPORT",
    },
  })

  const t = useTranslations("Components.Chat")
  const { execute, isExecuting } = useAction(sendMessage)

  const onSubmit = (data: zMessageCreate) => {
    execute(data)
    form.reset()
    setTextareaHeight("40px")
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (!isExecuting) {
        form.handleSubmit(onSubmit)()
      }
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault()
      const currentValue = form.getValues("content")
      form.setValue("content", currentValue + "\n")
    }
  }

  const handleAppendText = (text: string) => {
    const currentValue = form.getValues("content")
    form.setValue("content", currentValue + text)
  }

  // Change height of textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState("40px")

  const emessage = form.watch("content")
  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`)
    }
  }, [emessage])

  if (asModal) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("bg-white", className)}
        >
          {/* Textarea and submit button */}
          <div className="flex w-full flex-col items-center gap-3.5 p-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <>
                  <FormControl>
                    <textarea
                      placeholder={t("text-area-placeholder")}
                      onKeyDown={handleKeyPress}
                      className="h-32 w-full resize-none rounded-[10px] border px-2 py-1.5 placeholder:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-1 left-5" />
                </>
              )}
            />
            <DialogClose asChild>
              <Button
                variant="core"
                size="lg"
                type="submit"
                disabled={isExecuting}
              >
                {t("button-send")}
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "fixed bottom-0 overflow-hidden bg-white lg:static",
          className,
        )}
      >
        {/* Textarea and submit button */}
        <div className="flex w-screen items-center gap-3.5 p-4 lg:w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormControl>
                  <textarea
                    placeholder={t("text-area-placeholder")}
                    onKeyDown={handleKeyPress}
                    style={{ height: textareaHeight, overflow: "hidden" }}
                    className="w-full resize-none rounded-[10px] border px-2 py-1.5 placeholder:text-sm"
                    {...field}
                    ref={textareaRef}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-1 left-5" />
              </>
            )}
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 bg-gray-400 hover:bg-gray-500"
            type="submit"
            disabled={isExecuting}
          >
            <SendHorizontal size={20} className="text-white" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChatBottombar
