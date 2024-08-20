"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function Counter({ count }: { count?: number | null }) {
  if (!count) return null
  return (
    <Badge
      className={cn(
        "absolute left-1.5 top-0 grid h-5 w-5 place-content-center bg-red-700 font-bold",
        count > 99 && "w-8",
      )}
    >
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
