"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { AppConfig } from "@/lib/i18n"
import { useRouter } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
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
import { updateSection } from "@/server/actions/content-action"
import {
  sectionSchema,
  type zCard,
  type zSection,
} from "@/types/content.schema"
import FormCard from "./form-card"

type Props = {
  sectionData: zSection
  className?: string
}

export default function SectionForm({ sectionData, className }: Props) {
  const locale = useLocale()
  const t = useTranslations("Components.FormSection")
  const form = useForm<zSection>({
    resolver: zodResolver(sectionSchema),
    defaultValues: sectionData,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  })

  const { execute, isExecuting } = useAction(updateSection, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
      }
    },
  })

  const newCard: zCard = {
    sectionId: sectionData.uid as number,
    title_ru: "",
    title_ky: "",
    description_ru: "",
    description_ky: "",
    extra_ru: "",
    extra_ky: "",
    bullets_ru: [],
    bullets_ky: [],
    image: "",
  }

  function onSubmit(data: zSection) {
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
                {/* Название секции */}
                <FormField
                  control={form.control}
                  name={`sectionName_${locale.id}` as keyof zSection}
                  render={({ field }) => (
                    <FormItem className="xl:col-span-2">
                      <FormLabel>{t("section-name-label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("section-name-placeholder")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Заголовок */}
                <FormField
                  control={form.control}
                  name={`heading_${locale.id}` as keyof zSection}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("heading-label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder={t("heading-placeholder")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Подзаголовок */}
                <FormField
                  control={form.control}
                  name={`subheading_${locale.id}` as keyof zSection}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("subheading-label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder={t("subheading-placeholder")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Основная кнопка */}
                <FormField
                  control={form.control}
                  name={`primaryButton_${locale.id}` as keyof zSection}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("primary-button-label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("primary-button-placeholder")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Дополнительная кнопка */}
                <FormField
                  control={form.control}
                  name={`secondaryButton_${locale.id}` as keyof zSection}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("secondary-button-label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("secondary-button-placeholder")}
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Бэкграунд */}
                <div className="space-y-2">
                  <FormLabel>{t("image-label")}</FormLabel>
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

                {/* Карточки */}
                <div className="flex flex-wrap gap-10 xl:col-span-2">
                  {fields.map((field, index) => (
                    <FormCard
                      key={field.id}
                      index={index}
                      card={field}
                      fieldLocale={locale.id}
                      remove={remove}
                      className={sectionData.cards.length < 3 ? "flex-1" : ""}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="gap-5 border-t px-6 py-4">
          <Button type="submit" disabled={isExecuting}>
            {t("form-save")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => append(newCard)}
            className="w-fit"
          >
            <PlusCircle className="mr-2 size-5" />
            {t("button-add-new")}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}

{
  /* <FormDescription>
      <strong className="text-black">
        {t("current-value")}:
      </strong>{" "}
      {sectionData[
        `heading_${locale.id}` as keyof zSection
      ] || ""}
    </FormDescription> */
}
