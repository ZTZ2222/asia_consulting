"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "@/lib/i18n-navigation"

type Props = {
  sections: { title: string; href: string }[]
}

export default function ContentNavigation({ sections }: Props) {
  const pathname = usePathname()

  return (
    <nav className="grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-1">
      {sections.map(section => (
        <Link
          key={section.title}
          href={section.href}
          className={
            pathname === section.href ? "font-semibold text-primary" : ""
          }
        >
          {section.title}
        </Link>
      ))}
    </nav>
  )
}
