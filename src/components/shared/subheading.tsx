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
        "text-pretty leading-6 text-gray-650 lg:text-lg lg:leading-[30px] xl:text-xl",
        className,
      )}
    >
      {children}
    </p>
  )
}
