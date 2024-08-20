import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export default function SectionName({ className, children }: Props) {
  return (
    <h2
      className={cn(
        "text-lg font-black leading-5 text-rose-750 lg:text-xl lg:leading-[22px]",
        className,
      )}
    >
      {children}
    </h2>
  )
}
