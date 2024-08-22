import React from "react"
import Image from "next/image"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Hero() {
  const sectionData = await getNormalizedSectionById("hero")

  return (
    <section
      id="hero"
      className="relative mb-10 flex h-[calc(100vh-70px)] w-full justify-center overflow-hidden"
    >
      <h1 className="mt-[180px] max-w-[289px] text-center text-4xl font-semibold leading-[44px] tracking-tight lg:max-w-[814px] lg:text-[64px] lg:leading-[80px]">
        <span className="text-blue-950">{sectionData?.heading} </span>
        <span className="text-[#757C8A]">{sectionData?.subheading} </span>
        <span className="text-blue-950">{sectionData?.primaryButton} </span>
        <br className="lg:hidden" />
        <span className="text-red-650">{sectionData?.secondaryButton} </span>
      </h1>
      <div className="absolute -right-[85px] top-4 -z-10 h-[234px] w-[308px] rotate-180 lg:top-20 lg:h-[341px] lg:w-[448px]">
        <Image
          src="/assets/coins.png"
          alt="Coins"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute -left-16 bottom-20 -z-10 h-[234px] w-[308px] lg:bottom-1/2 lg:h-[341px] lg:w-[448px] lg:translate-y-1/3">
        <Image
          src="/assets/coins.png"
          alt="Coins"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}
