import React from "react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import FormRequest from "@/components/forms/form-request"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function CTA() {
  const sectionData = await getNormalizedSectionById("cta")
  const card = sectionData?.cards[0]
  return (
    <div id="cta" className="container mb-24 space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
        <div className="space-y-3">
          <Heading>{sectionData?.heading}</Heading>
          <Subheading>{sectionData?.subheading}</Subheading>
        </div>
        <div className="relative h-[103px] w-[208px] justify-self-center">
          <Image
            src={sectionData?.image || "/assets/placeholder-gray.svg"}
            alt="Company Image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <FormRequest btnText={sectionData?.primaryButton} card={card} />
    </div>
  )
}
