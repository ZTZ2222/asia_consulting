import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Heading from "@/components/shared/heading"
import SectionName from "@/components/shared/section-name"
import Subheading from "@/components/shared/subheading"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function FAQ() {
  const sectionData = await getNormalizedSectionById("faq")
  return (
    <section className="container mb-[120px] space-y-[30px] md:mb-[170px] lg:flex lg:space-x-[50px]">
      <div className="space-y-[26px] lg:max-w-[650px]">
        <SectionName>{sectionData?.sectionName}</SectionName>
        <Heading>{sectionData?.heading}</Heading>
        <Subheading>{sectionData?.subheading}</Subheading>
      </div>
      <Accordion
        type="single"
        collapsible
        className="h-fit rounded-lg border border-[#ECECEC] bg-white"
      >
        {sectionData?.cards.map(card => (
          <AccordionItem
            key={card.uid}
            value={card.uid.toString()}
            className="flex w-[262px] flex-col lg:w-[368.73px] xl:w-[486px]"
          >
            <AccordionTrigger className="p-[30px] pb-5 text-start text-lg leading-5 text-black">
              {card.title}
            </AccordionTrigger>
            <AccordionContent className="mx-[30px] mb-[30px] text-base text-gray-650">
              {card.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
