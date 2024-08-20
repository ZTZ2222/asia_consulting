"use server"

import { db } from "@/server"

export const getUserByEmailPasswordOmit = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email?.toLowerCase() },
      omit: {
        password: true,
      },
    })

    if (!user) {
      return null
    }
    return user
  } catch (error) {
    return null
  }
}

export const getUserByEmailDanger = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email?.toLowerCase() },
    })

    if (!user) {
      return null
    }
    return user
  } catch (error) {
    return null
  }
}

export const getUserByIdPasswordOmit = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserByIdDanger = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    })
    return user
  } catch (error) {
    return null
  }
}
