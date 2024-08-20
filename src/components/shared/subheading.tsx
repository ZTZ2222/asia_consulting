import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Subheading({ className, children }: Props) {
  return (
    <p
      className={cn(
        "leading-6 text-gray-650 lg:text-lg lg:leading-[27px]",
        className,
      )}
    >
      {children}
    </p>
  )
}
