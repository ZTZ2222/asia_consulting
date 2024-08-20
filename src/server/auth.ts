import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparePassword } from "@/lib/utils"
import { db } from "@/server"
import {
  getUserByEmailDanger,
  getUserByIdPasswordOmit,
} from "@/server/data-access-layer/user"
import { credentialsSchema } from "@/types/auth.schema"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await credentialsSchema.parseAsync(credentials)

          const user = await getUserByEmailDanger(email)
          if (!user || !user?.password) return null
          const passwordMatch = await comparePassword(password, user?.password)

          if (!passwordMatch) return null

          return user
        } catch (error) {
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token

      const dbUser = await getUserByIdPasswordOmit(token.sub)

      if (!dbUser) return token

      token.name = dbUser.name
      token.email = dbUser.email
      token.picture = dbUser.image
      token.role = dbUser.role

      return token
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }

        if (token.email) {
          session.user.email = token.email
        }

        if (token.role) {
          session.user.role = token.role
        }

        session.user.name = token.name
        session.user.image = token.picture
      }

      return session
    },
  },
})
