"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AppConfig } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import ImageUploadthing from "@/components/ui/upload"
import { upsertMetadata } from "@/server/actions/content-action"
import {
  metaUpsertSchema,
  type zMetaRead,
  type zMetaUpsert,
} from "@/types/content.schema"

type Props = {
  metaData: zMetaRead | null
  className?: string
}

export default function MetadataForm({ metaData, className }: Props) {
  const locale = useLocale()
  const t = useTranslations("Components.FormMeta")
  const form = useForm<zMetaUpsert>({
    resolver: zodResolver(metaUpsertSchema),
    defaultValues: metaData || ({} as zMetaRead),
  })

  const { execute, isExecuting } = useAction(upsertMetadata, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
      }
    },
  })

  function onSubmit(data: zMetaUpsert) {
    execute(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <CardContent className="space-y-10">
          <Tabs defaultValue={locale}>
            <TabsList className="mb-5">
              {AppConfig.locales.map(locale => (
                <TabsTrigger key={locale.id} value={locale.id}>
                  {locale.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {AppConfig.locales.map(locale => (
              <TabsContent
                key={locale.id}
                value={locale.id}
                className="grid gap-x-5 gap-y-10 xl:grid-cols-2"
              >
                {/* Meta title */}
                <FormField
                  control={form.control}
                  name={`title_${locale.id}` as keyof zMetaUpsert}
                  render={({ field }) => (
                    <FormItem className="xl:col-span-2">
                      <FormLabel>{t("label-meta-title")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("placeholder-meta-title")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Meta description */}
                <FormField
                  control={form.control}
                  name={`description_${locale.id}` as keyof zMetaUpsert}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("label-meta-description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder={t("placeholder-meta-description")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Meta keywords */}
                <FormField
                  control={form.control}
                  name={`keywords_${locale.id}` as keyof zMetaUpsert}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("label-meta-keywords")}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder={t("placeholder-meta-keywords")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* OG Image */}
                <div className="space-y-2 xl:col-span-2">
                  <FormLabel>{t("label-og-image")}</FormLabel>
                  <FormField
                    control={form.control}
                    name="ogImage"
                    render={({ field }) => (
                      <ImageUploadthing
                        field={field}
                        className="h-[200px] w-[300px]"
                      />
                    )}
                  />
                </div>

                {/* Logo 1 */}
                <div className="space-y-2">
                  <FormLabel>{t("label-logo-1")}</FormLabel>
                  <FormField
                    control={form.control}
                    name="logo1"
                    render={({ field }) => (
                      <ImageUploadthing
                        field={field}
                        className="h-[200px] w-[300px]"
                      />
                    )}
                  />
                </div>

                {/* Logo 2 */}
                <div className="space-y-2">
                  <FormLabel>{t("label-logo-2")}</FormLabel>
                  <FormField
                    control={form.control}
                    name="logo2"
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
          <Button type="submit" size="sm" disabled={isExecuting}>
            <Save className="mr-2 size-5" />
            {t("button-save")}
          </Button>
        </CardContent>
      </form>
    </Form>
  )
}
