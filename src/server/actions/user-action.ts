"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "@/lib/i18n-navigation"
import { saltAndHashPassword } from "@/lib/utils"
import { db } from "@/server"
import { getUserByEmailDanger } from "@/server/data-access-layer/user"
import { userCreateSchema } from "@/types/user.schema"
import { actionClient } from "./safe-action"

export const createUser = actionClient
  .schema(userCreateSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, confirmPassword, ...rest } = parsedInput
    const normalizedEmail = email.toLowerCase()

    const existingUser = await getUserByEmailDanger(normalizedEmail)
    if (existingUser) return { error: "User already exists!" }

    const hashedPassword = await saltAndHashPassword(password)
    await db.user.create({
      data: {
        ...rest,
        email: normalizedEmail,
        password: hashedPassword,
      },
    })

    revalidatePath("/admin/users")
    redirect("/admin/users")

    // TODO: send verification email

    return { success: "User created!" }
  })
