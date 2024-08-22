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
    <div className="container mb-24 space-y-8">
      <div className="grid space-y-3">
        <Heading>{sectionData?.heading}</Heading>
        <Subheading>{sectionData?.subheading}</Subheading>
        <div className="relative h-[103px] w-[208px] justify-self-center">
          <Image
            src={sectionData?.image || ""}
            alt="Company Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <FormRequest
        btnText={sectionData?.primaryButton}
        card={card}
        className="lg:max-w-[320px]"
      />
    </div>
  )
}
