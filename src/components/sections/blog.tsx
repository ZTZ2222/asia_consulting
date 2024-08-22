import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import BlogCard from "@/components/shared/blog-card"
import Heading from "@/components/shared/heading"
import Subheading from "@/components/shared/subheading"
import { getNormalizedArticles } from "@/server/data-access-layer/article"
import { getNormalizedSectionById } from "@/server/data-access-layer/content"

export default async function Blog() {
  const sectionData = await getNormalizedSectionById("blog")

  const posts = await getNormalizedArticles()
  return (
    <section className="mb-24 space-y-8">
      <div className="container lg:flex lg:justify-between">
        <div className="space-y-[26px] lg:w-[75%]">
          <Heading>{sectionData?.heading}</Heading>
          <Subheading>{sectionData?.subheading}</Subheading>
        </div>
      </div>
      <ScrollArea className="pb-5 lg:container">
        <div className="flex w-max lg:space-x-5">
          {posts.map((post, index) => (
            <BlogCard
              key={post.uid}
              size="sm"
              {...post}
              className={
                index === posts.length - 1 ? "mx-5 lg:mx-0" : "ml-5 lg:ml-0"
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
