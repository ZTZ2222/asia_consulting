"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpenText,
  ClipboardList,
  MonitorCog,
  Settings,
  SquareTerminal,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import Counter from "@/app/[locale]/(protected)/admin/requests/_components/counter"
import LogoutButton from "@/components/ui/logout-button"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"

export function SidebarAdmin({
  count,
  children,
}: {
  count?: number | null
  children: React.ReactNode
}) {
  const t = useTranslations("Components.SidebarAdmin")
  const session = useSession()

  const links = [
    {
      label: t("dashboard"),
      href: "/admin",
      icon: (
        <SquareTerminal className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // {
    //   label: t("users"),
    //   href: "/admin/users",
    //   icon: (
    //     <Users className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    {
      label: t("cms"),
      href: "/admin/cms",
      icon: (
        <MonitorCog className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("blog"),
      href: "/admin/blog",
      icon: (
        <BookOpenText className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("settings"),
      href: "/admin/settings",
      icon: (
        <Settings className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ]
  const requestsLink = {
    label: t("requests"),
    href: "/admin/requests",
    icon: (
      <ClipboardList className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  }
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden lg:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col">
            {open ? <Logo /> : <LogoIcon />}
            {/* <Logo /> */}
            <div className="mt-8 flex flex-col gap-2">
              <div className="relative">
                <SidebarLink link={requestsLink} />
                <Counter count={count} />
              </div>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <LogoutButton />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label:
                  session.data?.user.name ||
                  session.data?.user.email ||
                  "Anonymous",
                href: "#",
                icon: (
                  <Image
                    src={session.data?.user.image || "/placeholder-user.jpg"}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  )
}
export const Logo = () => {
  const t = useTranslations("Components.SidebarAdmin")
  return (
    <Link
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black/80"
    >
      <div className="h-6 w-7 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black/80 dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="whitespace-pre font-medium text-black/80 dark:text-white"
      >
        {t("company-name")}
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black/80"
    >
      <div className="h-6 w-7 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black/80 dark:bg-white" />
    </Link>
  )
}
