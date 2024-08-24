"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { NormalizedCard } from "@/types/content.schema"

type Props = {
  cards: NormalizedCard[] | undefined
  className?: string
}

export default function CarouselWithBullets({ cards, className }: Props) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }
  return (
    <div className={cn("container", className)}>
      <Carousel
        setApi={setApi}
        className="relative min-w-[300px] overflow-hidden rounded-[10px] md:w-full"
      >
        <CarouselContent className="cursor-grab">
          {cards?.map((card, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <Card className="space-y-1 border-none bg-transparent">
                <CardContent className="relative h-[281px] p-0 md:h-[317px] lg:h-[352px]">
                  <Image
                    src={card.image || "/assets/placeholder-gray.svg"}
                    alt={card.title || `Carousel Image ${index + 1}`}
                    fill
                    className="object-cover md:object-contain"
                    sizes="100vw"
                    priority
                  />
                </CardContent>
                <CardFooter className="pb-0 text-center">
                  {card.title}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
              current - 1 === index
                ? "bg-red-550"
                : "border border-gray-25 bg-[#757C8A]"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
