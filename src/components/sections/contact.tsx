import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Contact() {
  const sectionData = await getNormalizedSectionById("contact")
  const Map = dynamic(() => import("@/components/shared/map-component"), {
    loading: () => <p>Идет загрузка карты...</p>,
    ssr: false,
  })
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
                  src={card.image || "/assets/placeholder-gray.svg"}
                  alt={card.title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        <Map
          latitude={Number(sectionData?.primaryButton)}
          longitude={Number(sectionData?.secondaryButton)}
        />
      </div>
    </section>
  )
}
