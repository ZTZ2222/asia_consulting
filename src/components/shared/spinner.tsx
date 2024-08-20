"use client"

import React from "react"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Spinner({
  small,
  className,
}: {
  small?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
        className={cn(
          "flex h-16 w-16 items-center justify-center",
          small && "h-5 w-5",
        )}
      >
        <Loader className={cn("h-16 w-16 text-blue-500", small && "h-5 w-5")} />
      </motion.div>
    </div>
  )
}
