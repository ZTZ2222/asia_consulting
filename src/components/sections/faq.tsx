import AccordionStep from "@/components/shared/accordion-step"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function FAQ() {
  const sectionData = await getNormalizedSectionById("faq")
  return (
    <section className="container mb-24 space-y-4">
      <div className="space-y-2">
        <Heading>{sectionData?.heading}</Heading>
        <Subheading>{sectionData?.subheading}</Subheading>
      </div>
      <AccordionStep cards={sectionData?.cards} />
    </section>
  )
}
