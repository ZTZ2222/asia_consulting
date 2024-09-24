"use server"

import { db } from "@/server"

/**
 * Retrieves a user by email address, excluding the password field
 * @param {string} email - The email address of the user to retrieve
 * @returns {Promise<object|null>} The user object without the password field, or null if not found or an error occurs
 */
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

```
/**
 * Retrieves a user from the database by their email address.
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<object|null>} The user object if found, or null if not found or in case of an error.
 */
```
export const getUserByEmailDanger = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email?.toLowerCase() },
    })

    if (!user) {
      return null
    /**
     * Retrieves a user by their ID, excluding the password field
     * @param {string} id - The unique identifier of the user
     * @returns {Promise<object|null>} The user object without the password field if found, or null if not found or an error occurs
     */
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

/**
 * Retrieves a user by their ID from the database, returning null if an error occurs.
 * @param {string} id - The unique identifier of the user to retrieve.
 * @returns {Promise<Object|null>} A Promise that resolves to the user object if found, or null if an error occurs or the user is not found.
 */
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
