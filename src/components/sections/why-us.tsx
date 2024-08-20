import React from "react"
import SectionName from "@/components/shared/section-name"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function WhyUs() {
  const sectionData = await getNormalizedSectionById("why-us")

  return (
    <section className="container mb-[100px] space-y-[30px] md:mb-[120px] md:space-y-[50px]">
      <SectionName>{sectionData?.sectionName}</SectionName>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sectionData?.cards?.map(card => (
          <div
            key={card.uid}
            className="space-y-7 rounded-[30px] border border-gray-350 bg-white p-[30px] text-center shadow-card xl:space-y-4 xl:px-[22px]"
          >
            <h4 className="text-lg font-bold leading-5 text-black xl:leading-[22px]">
              {card.title}
            </h4>
            <p className="leading-6 text-gray-650 xl:leading-5">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
