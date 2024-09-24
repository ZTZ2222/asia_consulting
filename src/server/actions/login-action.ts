"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/server/auth"
import { credentialsSchema } from "@/types/auth.schema"
import { actionClient } from "./safe-action"

export const loginUser = actionClient
  .schema(credentialsSchema)
  /**
   * Attempts to sign in a user with provided credentials and handles authentication errors.
   * @param {Object} options - The options object containing user credentials.
   * @param {string} options.email - The user's email address.
   * @param {string} options.password - The user's password.
   * @returns {Object} An object indicating success or error message.
   */
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin",
      })
      return { success: "User logged in" }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" }
          case "AccessDenied":
            return { error: error.message }
          case "OAuthSignInError":
            return { error: error.message }
          default:
            return { error: "Something went wrong" }
        }
      }
      throw error
    }
  })
