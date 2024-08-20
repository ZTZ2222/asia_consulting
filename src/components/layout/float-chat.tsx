import React from "react"
import Link from "next/link"
import { getSocials } from "@/server/data-access-layer/content"

export default async function FloatChat() {
  const socials = await getSocials()
  const whatsapp = socials?.find(social => social.name === "whatsapp")
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href={whatsapp?.link || ""}
        target="_blank"
        rel="noopener noreferrer"
        className="justify-centerp-4 relative inline-flex items-center transition-transform hover:scale-105"
        prefetch={false}
      >
        <div className="absolute inset-0 -z-10 animate-[ping_4s_ease-in-out_infinite] rounded-full bg-[#25D366] opacity-75" />
        {/* <ChatIcon /> */}
        <span className="sr-only">WhatsApp</span>
      </Link>
    </div>
  )
}
