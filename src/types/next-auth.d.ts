import { UserRole } from "@prisma/client"
import { JWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  createdAt: Date
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
