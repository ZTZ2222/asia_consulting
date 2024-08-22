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
      <h1 className="mt-[180px] max-w-[289px] text-center text-4xl font-semibold leading-[44px] tracking-tight">
        <span className="text-blue-950">{sectionData?.heading} </span>
        <span className="text-[#757C8A]">{sectionData?.subheading} </span>
        <span className="text-blue-950">{sectionData?.primaryButton} </span>
        <br />
        <span className="text-red-650">{sectionData?.secondaryButton} </span>
      </h1>
      <div className="absolute -right-[85px] top-4 -z-10 h-[234px] w-[308px] rotate-180">
        <Image
          src="/assets/coins.png"
          alt="Coins"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute -left-16 bottom-20 -z-10 h-[234px] w-[308px]">
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
