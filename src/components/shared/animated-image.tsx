"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  image: string | null | undefined
  title: string | null | undefined
  description: string | null | undefined
  extra: string | null | undefined
  className?: string
}

export default function AnimatedImage({
  image,
  title,
  description,
  extra,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative h-[420px] w-[358px] overflow-hidden rounded-3xl lg:h-auto lg:w-full",
        className,
      )}
    >
      <Image
        src={image || "/assets/placeholder-gray.svg"}
        alt="Company Image"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0" }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
        }}
        className="absolute bottom-0 space-y-4 bg-white/30 px-6 py-4 text-white backdrop-blur-md lg:w-full"
      >
        <h3 className="text-[32px] font-semibold leading-10 tracking-tight">
          {title}
        </h3>
        <div className="space-y-1">
          <p className="text-lg font-semibold leading-7">{description}</p>
          <p>{extra}</p>
        </div>
      </motion.div>
    </div>
  )
}
