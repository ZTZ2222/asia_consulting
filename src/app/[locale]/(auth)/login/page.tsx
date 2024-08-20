import React from "react"
import { redirect } from "@/lib/i18n-navigation"
import { auth } from "@/server/auth"
import FormLogin from "./_components/form-login"

export default async function Login() {
  const session = await auth()
  if (session?.user) {
    redirect("/admin")
  }
  return (
    <div className="grid h-screen w-full place-content-center">
      <div className="h-[542px]">
        <FormLogin />
      </div>
    </div>
  )
}
