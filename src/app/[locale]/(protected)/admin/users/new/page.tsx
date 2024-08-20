"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import ImageUploadthing from "@/components/ui/upload"
import { createUser } from "@/server/actions/user-action"
import { userCreateSchema, zUserCreate } from "@/types/user.schema"
import CardCredentials from "../_components/card-credentials"
import CardRole from "../_components/card-role"

export default function CreateUser() {
  const t = useTranslations("Components.FormUser")
  const form = useForm<zUserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      // emailVerified: new Date(),
      image: "",
      role: "USER",
    },
  })

  const { execute, isExecuting } = useAction(createUser, {
    onSuccess(data) {
      if (data.data?.error) {
        toast.error(t("toast-error"), {
          duration: 4000,
        })
      } else {
        toast.success(t("toast-success"), {
          duration: 4000,
        })
      }
    },
  })

  function onSubmit(values: zUserCreate) {
    execute(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create User
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/users">Discard</Link>
            </Button>
            <Button type="submit" size="sm" disabled={isExecuting}>
              Create User
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-12">
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <CardCredentials />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>User Image</CardTitle>
                    <CardDescription>
                      Upload a profile image for your user.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ImageUploadthing field={field} />
                  </CardContent>
                </Card>
              )}
            />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <CardRole />
          </div>
        </div>
      </form>
    </Form>
  )
}
