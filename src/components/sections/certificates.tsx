import React from "react"
import CarouselWithBullets from "@/components/shared/carousel-with-bullets"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Certificates() {
  const sectionData = await getNormalizedSectionById("certificates")

  return (
    <CarouselWithBullets
      cards={sectionData?.cards}
      className="mb-24 mt-12 lg:mt-28"
    />
  )
}
