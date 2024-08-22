import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Heading({ className, children }: Props) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-9 tracking-tight text-[#101828] lg:text-4xl",
        className,
      )}
    >
      {children}
    </h3>
  )
}
