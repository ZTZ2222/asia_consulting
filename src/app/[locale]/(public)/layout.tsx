import React from "react"
import BackToTopButton from "@/components/layout/back-to-top-button"
import FloatChat from "@/components/layout/float-chat"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { getChatById } from "@/server/data-access-layer/chat"
import { getMetadata } from "@/server/data-access-layer/content"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const logo = (await getMetadata())?.logo1
  const chat = await getChatById()
  return (
    <div className="flex flex-col">
      <Header logo={logo} />
      <main className="grow lg:mt-24">{children}</main>
      <BackToTopButton />
      <FloatChat initialMessages={chat?.messages} chatId={chat?.chatId} />
      <Footer />
    </div>
  )
}
