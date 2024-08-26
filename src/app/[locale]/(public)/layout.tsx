import React from "react"
import BackToTopButton from "@/components/layout/back-to-top-button"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import TawkToChat from "@/components/shared/tawk-to-chat"
import { getMetadata } from "@/server/data-access-layer/content"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const logo = (await getMetadata())?.logo1
  return (
    <>
      <div className="flex flex-col">
        <Header logo={logo} />
        <main className="grow lg:mt-24">{children}</main>
        <BackToTopButton />
        {/* <FloatChat /> */}
        <Footer />
      </div>
      <TawkToChat />
    </>
  )
}
