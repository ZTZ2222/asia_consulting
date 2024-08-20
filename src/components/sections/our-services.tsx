import Heading from "@/components/shared/heading"
import SectionName from "@/components/shared/section-name"
import ServiceCard from "@/components/shared/service-card"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function OurServices() {
  const sectionData = await getNormalizedSectionById("our-services")

  return (
    <section
      id="our-services"
      className="container mb-[100px] space-y-[30px] md:mb-[120px] md:space-y-[50px]"
    >
      <div className="space-y-[26px]">
        <SectionName>{sectionData?.sectionName}</SectionName>
        <Heading>{sectionData?.heading}</Heading>
        <Subheading>{sectionData?.subheading}</Subheading>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sectionData?.cards.map((card, index) => (
          <ServiceCard key={card.uid} card={card} index={index} />
        ))}
      </div>
    </section>
  )
}
