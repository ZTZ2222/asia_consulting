"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormError from "@/components/forms/form-error"
import FormSuccess from "@/components/forms/form-success"
import { loginUser } from "@/server/actions/login-action"
import { credentialsSchema, zCredentials } from "@/types/auth.schema"

export default function FormLogin() {
  const t = useTranslations("Components.FormLogin")
  const form = useForm<zCredentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { execute } = useAction(loginUser, {
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

  function onSubmit(data: zCredentials) {
    execute(data)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label-email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label-password")}</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message="" />
            <FormSuccess message="" />
            <Button type="submit" className="w-full">
              {t("submit-button")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
