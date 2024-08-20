"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "@/lib/i18n-navigation"
import { cn } from "@/lib/utils"
import Navigation from "@/components/layout/navigation"

export default function Header({ logo }: { logo?: string }) {
  const pathname = usePathname()
  return (
    <header
      className={cn(
        "container my-[30px] flex items-center justify-between lg:mb-10 lg:mt-5",
        pathname === "/" && "hidden",
      )}
    >
      <Link href="/" className="relative size-14 lg:size-[120px]">
        <Image
          src={logo || ""}
          alt="AR Finance Logo"
          fill
          className="object-cover"
        />
      </Link>
      <Navigation logo={logo} />
    </header>
  )
}
