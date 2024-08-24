import Image from "next/image"
import { cn } from "@/lib/utils"
import type { NormalizedCard } from "@/types/content.schema"

type Props = {
  card: NormalizedCard
  className?: string
}

export default function ServiceCard({ card, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 text-center text-white",
        className,
      )}
    >
      {/* Icon */}
      <div className="relative size-12">
        <Image
          src={card.image || "/assets/placeholder-gray.svg"}
          alt={card.title || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold leading-6 text-red-550">{card.title}</h4>

      {/* Bullets */}
      <ul className="grid gap-3 leading-6">
        {card.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}
