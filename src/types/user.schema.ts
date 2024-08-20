import { z } from "zod"

const passwordMatchRefinement = {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
}

const userBaseSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email({ message: "Некорректная почта" }),
  password: z.string().min(1, { message: "Пароль не может быть пустым" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Пароль не может быть пустым" }),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.enum(["USER", "ADMIN", "MANAGER"]),
})

export const userCreateSchema = userBaseSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  passwordMatchRefinement,
)

export const userUpdateSchema = userBaseSchema
  .omit({ password: true, confirmPassword: true })
  .extend({ id: z.string() })

export const userChangePasswordSchema = z
  .object({
    id: z.string(),
    password: z.string().min(1, { message: "Пароль не может быть пустым" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Пароль не может быть пустым" }),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    passwordMatchRefinement,
  )

export const userChangeEmailSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: "Некорректная почта" }),
})

export const userReadSchema = userUpdateSchema.extend({
  createdAt: z.date(),
})

export type zUserCreate = z.infer<typeof userCreateSchema>
export type zUserUpdate = z.infer<typeof userUpdateSchema>
export type zUserChangePassword = z.infer<typeof userChangePasswordSchema>
export type zUserChangeEmail = z.infer<typeof userChangeEmailSchema>
export type zUserRead = z.infer<typeof userReadSchema>
