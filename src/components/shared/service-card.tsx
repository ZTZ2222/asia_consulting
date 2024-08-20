"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { NormalizedCard } from "@/types/content.schema"

type Props = {
  card: NormalizedCard
  index: number
  className?: string
}

export default function ServiceCard({ card, index, className }: Props) {
  const t = useTranslations("Components.Button")
  return (
    <motion.div
      className={cn(
        "space-y-5 rounded-[30px] bg-white px-6 py-10 shadow-card",
        className,
      )}
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "100px" }}
    >
      {/* Icon */}
      <div className="relative size-9">
        <Image
          src={card.image || ""}
          alt={card.title || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold leading-5 text-[#1E1E1E]">
        {card.title}
      </h4>

      {/* Description and bullets */}
      <div className="line-clamp-4 leading-6 text-[#757575]">
        <p>{card.description}</p>
        {card.bullets.length > 0 && (
          <ul className="line-clamp-4 list-inside list-disc xl:hidden">
            {card.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Price */}
      <p className="text-lg font-bold leading-5 text-[#1E1E1E]">{card.extra}</p>

      {/* Dialog Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="support" size="mobile">
            {t("learn-more")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[358px] gap-5 rounded-[30px] bg-white md:max-w-[585px] lg:max-w-[685px]">
          {/* Icon */}
          <div className="relative size-9">
            <Image
              src={card.image || ""}
              alt={card.title || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold leading-5 text-[#1E1E1E]">
            {card.title}
          </h4>

          {/* Description and bullets */}
          <div className="leading-6 text-[#757575]">
            <p>{card.description}</p>
            {card.bullets.length > 0 && (
              <ul className="list-inside list-disc">
                {card.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Price */}
          <p className="text-lg font-bold leading-5 text-[#1E1E1E]">
            {card.extra}
          </p>

          {/* Close Button */}
          <DialogClose asChild>
            <Button variant="support" size="mobile">
              {t("close")}
            </Button>
          </DialogClose>
          <DialogHeader className="sr-only">
            <DialogTitle>{card.title}</DialogTitle>
            <DialogDescription>{card.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
