"use client"

import React from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
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
import ImageUploadthing from "@/components/ui/upload"
import { deleteSocial, upsertSocials } from "@/server/actions/content-action"
import { type zSocial } from "@/types/content.schema"

type Props = {
  socialsData: zSocial[]
  className?: string
}

type FormValues = {
  socials: zSocial[]
}

export default function SocialsForm({ socialsData, className }: Props) {
  const t = useTranslations("Components.FormSection")
  const form = useForm<FormValues>({
    defaultValues: {
      socials: socialsData.length
        ? socialsData
        : [
            {
              name: "",
              link: "",
              icon: "",
            },
          ],
    },
  })

  const newSocial: zSocial = {
    type: "",
    name: "",
    link: "",
    icon: "",
  }

  const {
    fields: socialFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "socials",
  })

  const { execute, isExecuting } = useAction(upsertSocials, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
      }
    },
  })

  const { execute: deleteDB, isExecuting: isDeleting } = useAction(
    deleteSocial,
    {
      onSuccess: ({ data }) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
        }
      },
    },
  )

  function handleDelete(itemUID: number | undefined, itemIndex: number) {
    if (!itemUID) {
      remove(itemIndex)
    } else {
      deleteDB({ uid: itemUID })
      remove(itemIndex)
    }
  }

  function onSubmit(data: FormValues) {
    execute(data.socials)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <CardContent className="space-y-10">
          {/* Карточки */}
          <div className="flex flex-wrap gap-10 xl:col-span-2">
            {socialFields.map((social, index) => (
              <div
                key={social.id}
                className={cn(
                  "relative space-y-5 rounded-lg border border-slate-200 p-5",
                  socialsData.length <= 3 && "flex-1",
                )}
              >
                {/* Delete button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete.bind(null, social.uid, index)}
                  className="absolute right-2 top-2"
                  disabled={isDeleting}
                >
                  <Trash2 className="size-5" />
                </Button>

                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name={`socials.${index}.icon`}
                  render={({ field }) => (
                    <ImageUploadthing field={field} className="mx-auto" />
                  )}
                />

                {/* Card Name (RU) */}
                <FormField
                  control={form.control}
                  name={`socials.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card {index + 1} - Name (RU)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter card name (ru)"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Card Link */}
                <FormField
                  control={form.control}
                  name={`socials.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card {index + 1} - Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter card link"
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-5 border-t px-6 py-4">
          <Button type="submit" disabled={isExecuting}>
            {t("form-save")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => append(newSocial)}
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
