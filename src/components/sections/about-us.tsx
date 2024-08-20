import React from "react"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function AboutUs() {
  const sectionData = await getNormalizedSectionById("about-us")

  return (
    <section
      id="about"
      className="container relative mb-[100px] overflow-hidden md:mb-[120px] xl:flex xl:overflow-visible"
    >
      <div className="space-y-[26px] xl:mt-[140px]">
        {/* <Heading>{sectionData?.heading}</Heading> */}
        <Heading>Азия Консалтинг Company</Heading>
        {/* <Subheading>{sectionData?.subheading}</Subheading> */}
      </div>
    </section>
  )
}
