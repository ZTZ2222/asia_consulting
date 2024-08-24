"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import type { NormalizedCard } from "@/types/content.schema"

type ParallaxProps = {
  image: string | null | undefined
  cards: NormalizedCard[] | undefined
}

export default function Parallax({ image, cards }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const ySpring = useSpring(y, {
    stiffness: 1000,
    damping: 200,
  })

  return (
    <div
      ref={ref}
      className="relative flex h-[550px] flex-wrap rounded-3xl border border-[#F7F7F7]"
    >
      {cards?.map((card, i) => {
        return (
          <motion.div
            className={cn(
              "grid gap-2 rounded-2xl bg-white p-4 shadow-[0px_0px_9px_0px_#0000000D]",
              i === 0
                ? "absolute left-10 top-0 w-[258px]"
                : i === 1
                  ? "absolute -right-5 top-1/2 w-[200px]"
                  : "absolute -bottom-20 right-10 w-[302px]",
            )}
            key={i}
            style={{
              y: ySpring,
            }}
          >
            <p className="text-lg font-semibold leading-6 text-[#101828] lg:text-xl">
              {card.title}
            </p>
            {card.description && (
              <p className="text-sm font-medium leading-5 text-[#475467]">
                {card.description}
              </p>
            )}
          </motion.div>
        )
      })}
      <Image
        src={image || "/assets/placeholder-gray.svg"}
        alt="Background Image"
        fill
        className="-z-10 rounded-3xl object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}
