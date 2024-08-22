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
  .action(async ({ parsedInput: metadata }) => {
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
