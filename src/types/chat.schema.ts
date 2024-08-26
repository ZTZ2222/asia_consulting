import { z } from "zod"

export const messageCreateSchema = z.object({
  chatId: z.string().uuid(),
  content: z.string(),
  sender: z.enum(["CUSTOMER", "SUPPORT"]),
})

export const messageReadSchema = messageCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
})

export const chatReadSchema = z.object({
  chatId: z.string().uuid(),
  messages: z.array(messageReadSchema),
  createdAt: z.date(),
})

export const chatDeleteSchema = z.object({
  chatId: z.string().uuid(),
})

export type zMessageCreate = z.infer<typeof messageCreateSchema>
export type zMessageRead = z.infer<typeof messageReadSchema>
export type zChatRead = z.infer<typeof chatReadSchema>
export type zChatDelete = z.infer<typeof chatDeleteSchema>
