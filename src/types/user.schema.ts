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
  /**
   * Validates if the password and confirmation password match
   * @param {Object} obj - An object containing password and confirmPassword
   * @param {string} obj.password - The password to be validated
   * @param {string} obj.confirmPassword - The confirmation password to be compared
   * @returns {boolean} True if passwords match, false otherwise
   */
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
    /**
     * Validates if the password and confirmation password match.
     * @param {Object} obj - An object containing password and confirmPassword.
     * @param {string} obj.password - The original password entered by the user.
     * @param {string} obj.confirmPassword - The confirmation password entered by the user.
     * @returns {boolean} Returns true if the passwords match, false otherwise.
     */
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
