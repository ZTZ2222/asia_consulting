"use client"

import React from "react"
import { MessageCircleMore } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChatBottombar from "./chat-bottom-bar"

type Props = {
  chatId?: string
}

const ChatModal: React.FC<Props> = ({ chatId }) => {
  const t = useTranslations("ContactBlock")

  const router = useRouter()

  if (!chatId) {
    // TODO: Write logic to create chatId if it doesn't exist in cookies
    // return (
    //   <Button
    //     onClick={() => router.push("/login")}
    //     variant="contact-chat"
    //     size="col-2"
    //   >
    //     <MessageCircleMore className="size-5" />
    //     {t("chat")}
    //   </Button>
    // );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="core" size="lg">
          <MessageCircleMore className="size-5" />
          Чат
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t("chat-modal-title")}
          </DialogTitle>
        </DialogHeader>
        <ChatBottombar
          asModal
          chatId={chatId || ""}
          className="w-[calc(100vw-50px)] md:w-[460px]"
        />
      </DialogContent>
    </Dialog>
  )
}

export default ChatModal
