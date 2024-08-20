"use server"

import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { z } from "zod"
import { db } from "@/server"
import { actionClient } from "@/server/actions/safe-action"
import {
  clientRequestCreateSchema,
  clientRequestUpdateSchema,
} from "@/types/request.schema"

export const createClientRequest = actionClient
  .schema(clientRequestCreateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      await db.clientRequest.create({ data: parsedInput })
      revalidatePath("/admin/requests")
      revalidatePath("/[locale]/(protected)", "layout")
      return { success: t("Server.actions.request-submit-success") }
    } catch (error) {
      console.log(error)

      return { error: t("Server.actions.request-submit-error") }
    }
  })

export const updateClientRequest = actionClient
  .schema(clientRequestUpdateSchema)
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      await db.clientRequest.update({
        where: { uid: parsedInput.uid },
        data: parsedInput,
      })
      revalidatePath("/admin/requests")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const deleteClientRequest = actionClient
  .schema(z.object({ uid: z.number() }))
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      await db.clientRequest.delete({ where: { uid: parsedInput.uid } })
      revalidatePath("/admin/requests")

      return { success: t("Server.actions.success-delete") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })

export const changeClientRequestStatus = actionClient
  .schema(z.object({ uid: z.number() }))
  .action(async ({ parsedInput }) => {
    const t = await getTranslations()
    try {
      const request = await db.clientRequest.findUnique({
        where: { uid: parsedInput.uid },
      })
      if (!request) return { error: t("Server.actions.item-not-found") }
      if (request.status === "READ") {
        await db.clientRequest.update({
          where: { uid: parsedInput.uid },
          data: { status: "UNREAD" },
        })
      } else {
        await db.clientRequest.update({
          where: { uid: parsedInput.uid },
          data: { status: "READ" },
        })
      }
      revalidatePath("/admin/requests")
      revalidatePath("/[locale]/(protected)", "layout")

      return { success: t("Server.actions.success-update") }
    } catch (error) {
      return { error: t("Server.actions.error") }
    }
  })
