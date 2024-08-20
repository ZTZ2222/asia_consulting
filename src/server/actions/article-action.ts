"use server"

import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { z } from "zod"
import { db } from "@/server"
import { actionClient } from "@/server/actions/safe-action"
import { articleCreateSchema, articleUpdateSchema } from "@/types/blog.schema"

export const createArticle = actionClient
  .schema(articleCreateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    const { socials: articleSocials, ...rest } = parsedInput

    try {
      const savedArticle = await db.article.create({
        data: rest,
      })

      // Update each card individually
      if (articleSocials.length > 0) {
        for (const articleSocial of articleSocials) {
          await db.articleSocial.create({
            data: { ...articleSocial, articleId: savedArticle.uid },
          })
        }
      }

      revalidatePath("/blog")
      revalidatePath("/admin/blog")

      return { success: t("Server.actions.success-create") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const updateArticle = actionClient
  .schema(articleUpdateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    const { socials: articleSocials, ...rest } = parsedInput

    try {
      await db.article.update({
        where: { uid: parsedInput.uid },
        data: rest,
      })

      // Update each card individually
      if (articleSocials.length > 0) {
        await db.articleSocial.updateMany({
          where: { articleId: parsedInput.uid },
          data: articleSocials,
        })
      }

      revalidatePath("/blog")
      revalidatePath("/admin/blog")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const deleteArticle = actionClient
  .schema(z.object({ uid: z.number() }))
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()

    try {
      await db.article.delete({
        where: { uid: parsedInput.uid },
      })

      revalidatePath("/blog")
      revalidatePath("/admin/blog")

      return { success: t("Server.actions.success-delete") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })
