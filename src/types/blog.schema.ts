import { z } from "zod"

export const articleSocialCreateSchema = z.object({
  name: z.string(),
  link: z.string(),
  icon: z.string().nullable(),
})

export const articleSocialReadSchema = articleSocialCreateSchema.extend({
  uid: z.number(),
  articleId: z.number(),
})

export const articleCreateSchema = z.object({
  title_ru: z.string().min(1),
  title_ky: z.string().nullable(),
  content_ru: z.string().min(1),
  content_ky: z.string().nullable(),
  image: z.string(),
  linkTitle_ru: z.string().nullable(),
  linkTitle_ky: z.string().nullable(),
  linkHref: z.string().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  socials: z.array(articleSocialCreateSchema),
})

export const articleUpdateSchema = articleCreateSchema
  .omit({
    socials: true,
  })
  .extend({
    uid: z.number(),
    socials: z.array(articleSocialReadSchema),
    createdAt: z.date(),
    updatedAt: z.date(),
  })

export const articleReadSchema = articleUpdateSchema

export type NormalizedArticleRead = {
  uid: number
  title: string
  content: string
  image: string
  linkTitle: string | null
  linkHref: string | null
  status: string
  socials: zArticleSocialRead[]
  createdAt: Date
  updatedAt: Date | null
}

export type zArticleSocialCreate = z.infer<typeof articleSocialCreateSchema>
export type zArticleSocialRead = z.infer<typeof articleSocialReadSchema>
export type zArticleCreate = z.infer<typeof articleCreateSchema>
export type zArticleUpdate = z.infer<typeof articleUpdateSchema>
export type zArticleRead = z.infer<typeof articleReadSchema>
