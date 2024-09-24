"use server"

import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { z } from "zod"
import { db } from "@/server"
import {
  metaUpsertSchema,
  sectionSchema,
  socialSchema,
} from "@/types/content.schema"
import { actionClient } from "./safe-action"

export const updateSection = actionClient
  .schema(sectionSchema)
  /**
   * Updates a section and its associated cards in the database
   * @param {Object} parsedInput - The input object containing section and card data
   * @param {string} parsedInput.uid - The unique identifier of the section to update
   * @param {Array} parsedInput.cards - An array of card objects to update or create
   * @param {Object} parsedInput.[...rest] - Other properties of the section to update
   * @returns {Promise<Object>} An object indicating success or error status
   */
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    const { cards, ...rest } = parsedInput

    try {
      await db.section.update({
        where: { uid: parsedInput.uid },
        data: rest,
      })

      // Update each card individually
      for (const card of cards) {
        if (card.uid) {
          await db.card.update({
            where: { uid: card.uid },
            data: card,
          })
        } else {
          await db.card.create({ data: card })
        }
      }

      revalidatePath("/admin/cms/[section]")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const deleteCard = actionClient
  .schema(z.object({ uid: z.number() }))
  /**
   * Asynchronously deletes a card from the database based on the provided UID
   * @param {Object} parsedInput - The parsed input containing the card's UID
   * @param {string} parsedInput.uid - The unique identifier of the card to be deleted
   * @returns {Promise<Object>} An object containing either a success message or an error message
   */
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      await db.card.delete({ where: { uid: parsedInput.uid } })
      revalidatePath("/admin/cms/[section]")

      return { success: t("Server.actions.success-delete") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const upsertSocials = actionClient
  .schema(socialSchema.array())
  /**
   * Updates or creates social media entries in the database
   * @param {Object} options - The options object
   * @param {Array} options.parsedInput - An array of social media objects to update or create
   * @returns {Promise<Object>} An object indicating success or error
   */
  .action(async ({ parsedInput: socials }) => {
    const t = await getTranslations()
    try {
      for (const social of socials) {
        if (social.uid) {
          await db.social.update({
            where: { uid: social.uid },
            data: social,
          })
        } else {
          await db.social.create({
            data: social,
          })
        }
      }

      revalidatePath("/", "layout")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const deleteSocial = actionClient
  .schema(z.object({ uid: z.number() }))
  /**
   * Asynchronously deletes a social record from the database based on the provided UID
   * @param {Object} parsedInput - The parsed input object containing the UID
   * @param {string} parsedInput.uid - The unique identifier of the social record to delete
   * @returns {Promise<Object>} An object containing either a success message or an error message
   */
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      await db.social.delete({ where: { uid: parsedInput.uid } })
      revalidatePath("/", "layout")

      return { success: t("Server.actions.success-delete") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const upsertMetadata = actionClient
  .schema(metaUpsertSchema)
  ```
  /**
   * Asynchronously updates or creates metadata in the database based on the provided input.
   * @param {Object} options - The options object.
   * @param {Object} options.parsedInput - The metadata object to be updated or created.
   * @param {string} [options.parsedInput.uid] - The unique identifier for the metadata.
   * @returns {Promise<Object>} An object containing a success message or an error message.
   */
  
  /**
   * Asynchronously updates or creates metadata in the database based on the provided input.
   * @param {Object} options - The options object.
   * @param {Object} options.parsedInput - The parsed input object containing metadata.
   * @param {string} [options.parsedInput.uid] - The unique identifier for the metadata (optional).
   * @returns {Promise<Object>} An object containing a success message or an error message.
   */
  ```  .action(async ({ parsedInput: metadata }) => {
    const t = await getTranslations()
    try {
      if (metadata.uid) {
        await db.metaData.update({
          where: { uid: metadata.uid },
          data: metadata,
        })
      } else {
        await db.metaData.create({
          data: metadata,
        })
      }

      revalidatePath("/", "layout")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      console.log(error)

      return { error: t("Server.actions.error") }
    }
  })
