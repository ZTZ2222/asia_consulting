import { z } from "zod"

export const credentialsSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
})

export type zCredentials = z.infer<typeof credentialsSchema>
