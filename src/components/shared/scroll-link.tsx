"use client"

import Link from "next/link"
import { usePathname, useRouter } from "@/lib/i18n-navigation"
import { cn } from "@/lib/utils"

type ScrollLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ScrollLink({
  href,
  children,
  className,
}: ScrollLinkProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (pathname !== "/") {
      router.push(`/#${href}`)
    }

    const element = document.getElementById(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <Link
      href={`#${href}`}
      onClick={handleClick}
      className={cn(
        "w-fit text-xl font-semibold leading-6 text-blue-950 xl:text-base",
        className,
      )}
    >
      {children}
    </Link>
  )
}
