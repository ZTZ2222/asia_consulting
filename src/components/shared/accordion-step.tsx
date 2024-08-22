"use client"

import { useState } from "react"
import { ArrowDownRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NormalizedCard } from "@/types/content.schema"

type Props = {
  cards: NormalizedCard[] | undefined
  className?: string
}

export default function AccordionStep({ cards, className }: Props) {
  const [openItem, setOpenItem] = useState<string | null>("item-1")

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {cards?.map((card, index) => {
        const isOpen = openItem === `item-${index + 1}`
        return (
          <div
            key={index}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-700 ease-out",
              isOpen
                ? "max-h-96 bg-blue-950 text-white"
                : "max-h-36 bg-gray-200 text-blue-950",
            )}
            onClick={() => toggleItem(`item-${index + 1}`)}
          >
            <div
              className={cn(
                "w-[278px] md:w-[calc(100%-64px)]",
                !isOpen && "line-clamp-3",
              )}
            >
              <p
                className={cn(
                  "mb-3 text-2xl font-semibold leading-7 tracking-tight",
                  isOpen ? "text-white" : "text-[#30A70C]",
                )}
              >
                {card.title}
              </p>
              <p className="mb-3">{card.description}</p>
              <p className="mb-1.5">{card.extra}</p>
              <ul className="list-inside list-disc">
                {card.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
            <ArrowDownRight
              className={`absolute bottom-6 right-6 size-8 transition-all duration-200 ease-in-out lg:size-12 ${
                isOpen ? "text-red-550 -rotate-90 transform" : ""
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}
