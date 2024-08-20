import React from "react"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Hero() {
  const sectionData = await getNormalizedSectionById("hero")

  return (
    <section
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url(${sectionData?.image})` || `url("")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      Hero Section
    </section>
  )
}
