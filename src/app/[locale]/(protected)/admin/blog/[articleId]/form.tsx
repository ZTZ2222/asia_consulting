"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AppConfig } from "@/lib/i18n"
import { useRouter } from "@/lib/i18n-navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUploadthing from "@/components/ui/upload"
import Editor from "@/components/shared/editor"
import { updateArticle } from "@/server/actions/article-action"
import { articleUpdateSchema, type zArticleUpdate } from "@/types/blog.schema"

type Props = {
  article: zArticleUpdate
  className?: string
}

export default function UpdateArticleForm({ article, className }: Props) {
  const locale = useLocale()
  const t = useTranslations("Components.FormArticle")
  const router = useRouter()
  const form = useForm<zArticleUpdate>({
    resolver: zodResolver(articleUpdateSchema),
    defaultValues: article,
  })

  const { execute, isExecuting } = useAction(updateArticle, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
        router.push("/admin/blog")
      }
    },
  })

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "socials",
  // })

  // const newSocial: zArticleSocialCreate = {
  //   name: "",
  //   link: "",
  //   icon: "",
  // }

  function onSubmit(data: zArticleUpdate) {
    execute(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <Card>
          <CardHeader className="space-y-3.5">
            <CardTitle>{t("form-title-update")}</CardTitle>
            <CardDescription className="line-clamp-3">
              {t("form-description-update")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <Tabs defaultValue={locale}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-5">
                <TabsList>
                  {AppConfig.locales.map(locale => (
                    <TabsTrigger key={locale.id} value={locale.id}>
                      {locale.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Статус */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("label-select-status")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "w-[140px]",
                              field.value === "DRAFT" && "text-yellow-600",
                              field.value === "PUBLISHED" && "text-green-600",
                              field.value === "ARCHIVED" && "text-red-600",
                            )}
                          >
                            <SelectValue placeholder="Select article status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT" className="text-yellow-600">
                            {t("status-draft")}
                          </SelectItem>
                          <SelectItem
                            value="PUBLISHED"
                            className="text-green-600"
                          >
                            {t("status-published")}
                          </SelectItem>
                          <SelectItem value="ARCHIVED" className="text-red-600">
                            {t("status-archived")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {AppConfig.locales.map(locale => (
                <TabsContent
                  key={locale.id}
                  value={locale.id}
                  className="grid gap-x-5 gap-y-5 lg:gap-y-10 xl:grid-cols-2"
                >
                  {/* Название блога */}
                  <FormField
                    control={form.control}
                    name={`title_${locale.id}` as keyof zArticleUpdate}
                    render={({ field }) => (
                      <FormItem className="xl:col-span-2">
                        <FormLabel>
                          {t("label-blog-title", { locale: locale.id })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("placeholder-blog-title")}
                            {...field}
                            value={(field.value as string) || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Контент блога */}
                  <FormField
                    control={form.control}
                    name={`content_${locale.id}` as keyof zArticleUpdate}
                    render={({ field }) => (
                      <FormItem className="xl:col-span-2">
                        <FormLabel>
                          {t("label-blog-content", { locale: locale.id })}{" "}
                        </FormLabel>
                        <FormControl>
                          <Editor
                            field={field}
                            placeholder={t("placeholder-blog-content")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Название ссылки */}
                  <FormField
                    control={form.control}
                    name={`linkTitle_${locale.id}` as keyof zArticleUpdate}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("label-link-title", { locale: locale.id })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("placeholder-link-title")}
                            {...field}
                            value={(field.value as string) || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Ссылка */}
                  <FormField
                    control={form.control}
                    name="linkHref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("label-link-href")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("placeholder-link-href")}
                            {...field}
                            value={(field.value as string) || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Главная картинка */}
                  <div className="space-y-2 xl:col-span-2">
                    <FormLabel>{t("label-blog-image")}</FormLabel>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <ImageUploadthing
                          field={field}
                          className="h-[200px] w-[300px]"
                        />
                      )}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex-wrap gap-5 border-t px-6 py-4">
            <Button type="submit" size="sm" disabled={isExecuting}>
              <Save className="mr-2 size-5" />
              {t("button-save-post")}
            </Button>
            <Button type="button" variant="secondary" size="sm">
              {t("button-cancel")}
            </Button>
            {/* <Button
              variant="secondary"
              type="button"
              onClick={() => append(newSocial)}
              className="w-fit"
            >
              <PlusCircle className="mr-2 size-5" />
              {t("button-add-social")}
            </Button> */}
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
