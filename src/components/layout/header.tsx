"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Navigation from "@/components/layout/navigation"

export default function Header({ logo }: { logo: string | null | undefined }) {
  return (
    <header
      className={cn(
        "container flex items-center justify-between border-b py-3 lg:mb-10 lg:mt-5",
      )}
    >
      <Link href="/" className="relative h-[46px] w-[92px]">
        <Image
          src={logo || "/assets/image_logo.png"}
          alt="Asia Consulting Logo"
          fill
          className="object-cover"
        />
      </Link>
      <Navigation logo={logo} />
    </header>
  )
}
