"use server"

import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { z } from "zod"
import { db } from "@/server"
import { actionClient } from "@/server/actions/safe-action"
import { articleCreateSchema, articleUpdateSchema } from "@/types/blog.schema"

export const createArticle = actionClient
  .schema(articleCreateSchema)
  /**
   * Asynchronously creates an article with associated social media entries
   * @param {Object} parsedInput - The input object containing article data
   * @param {Array} parsedInput.socials - An array of social media entries for the article
   * @param {Object} parsedInput.rest - The remaining article data (excluding socials)
   * @returns {Promise<Object>} An object indicating success or error status
   */
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
  /**
   * Updates an article and its associated social media cards in the database
   * @param {Object} parsedInput - The input object containing article data
   * @param {string} parsedInput.uid - The unique identifier of the article to update
   * @param {Object[]} parsedInput.socials - An array of social media card data
   * @param {Object} parsedInput.[...rest] - Other article properties to update
   * @returns {Promise<Object>} An object indicating success or error message
   */
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
  /**
   * Deletes an article from the database and revalidates related paths
   * @param {Object} parsedInput - The input object containing the article's UID
   * @param {string} parsedInput.uid - The unique identifier of the article to be deleted
   * @returns {Object} An object indicating the success or failure of the operation
   */
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
