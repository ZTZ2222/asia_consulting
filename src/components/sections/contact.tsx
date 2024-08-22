import React from "react"
import Image from "next/image"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Contact() {
  const sectionData = await getNormalizedSectionById("contact")
  return (
    <section id="contact" className="container mb-40 space-y-6">
      <div className="grid space-y-2">
        <Heading>{sectionData?.heading}</Heading>
        <Subheading>{sectionData?.subheading}</Subheading>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="grid gap-6">
          {sectionData?.cards.map((card, index) => (
            <div key={index} className="flex gap-5">
              <div className="relative size-12 shrink-0">
                <Image
                  src={card.image || ""}
                  alt={card.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold leading-[30px] text-[#101828]">
                  {card.title}
                </p>
                <p className="font-semibold leading-7 text-blue-950">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* TODO: Add Map */}
        <div className="relative h-[380px] w-full">
          <Image
            src={"/assets/map.png"}
            alt={"map"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
