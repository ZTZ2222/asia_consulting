import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/shared/heading"
import Parallax from "@/components/shared/parallax"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function AboutUs() {
  const sectionData = await getNormalizedSectionById("about-us")

  return (
    <section
      id="about-us"
      className="container mb-[100px] space-y-[120px] overflow-x-clip lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0"
    >
      <div className="flex flex-col justify-center gap-[12px] rounded-[24px] bg-gray-25 p-6 shadow-xl">
        <Heading>{sectionData?.heading}</Heading>
        <Separator />
        <Subheading>{sectionData?.subheading}</Subheading>
        <Button
          variant="core"
          size="lg"
          className="mt-[12px] self-center"
          asChild
        >
          <Link href="#cta">{sectionData?.primaryButton}</Link>
        </Button>
      </div>
      <Parallax image={sectionData?.image} cards={sectionData?.cards} />
    </section>
  )
}
