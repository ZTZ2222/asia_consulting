"use client"

import { PlusCircle, Trash2, XCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import {
  type FieldArrayWithId,
  type UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUploadthing from "@/components/ui/upload"
import { deleteCard } from "@/server/actions/content-action"
import type { zCard, zSection } from "@/types/content.schema"

type Props = {
  card: FieldArrayWithId<zSection, "cards", "id">
  fieldLocale: string
  index: number
  remove: UseFieldArrayRemove
  className?: string
}

export default function FormCard({
  card,
  fieldLocale,
  index,
  remove,
  className,
}: Props) {
  const t = useTranslations("Components.FormSection")
  const { control } = useFormContext()
  const { execute: deleteDB, isExecuting: isDeleting } = useAction(deleteCard, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
      }
    },
  })

  function handleDelete(itemUID: number | undefined, itemIndex: number) {
    if (!itemUID) {
      remove(itemIndex)
    } else {
      deleteDB({ uid: itemUID })
      remove(index)
    }
  }

  return (
    <div
      className={cn(
        "relative space-y-5 rounded-lg border border-slate-200 p-5",
        className,
      )}
    >
      {/* Image Upload */}
      <FormField
        control={control}
        name={`cards.${index}.image`}
        render={({ field }) => (
          <ImageUploadthing field={field} className="mx-auto" />
        )}
      />

      {/* Card Title */}
      <FormField
        control={control}
        name={`cards.${index}.title_${fieldLocale}` as keyof zSection}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("card-title", { number: index + 1 })}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("card-title-placeholder")}
                {...field}
                value={(field.value as string) || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Card Description */}
      <FormField
        control={control}
        name={`cards.${index}.description_${fieldLocale}` as keyof zSection}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("card-description-label", {
                number: index + 1,
              })}
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder={t("card-description-placeholder")}
                {...field}
                value={(field.value as string) || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Card Extra Field */}
      <FormField
        control={control}
        name={`cards.${index}.extra_${fieldLocale}` as keyof zSection}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("card-extra-label", { number: index + 1 })}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t("card-extra-placeholder")}
                {...field}
                value={(field.value as string) || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Card Bullets */}
      <FormField
        control={control}
        name={`cards.${index}.bullets_${fieldLocale}` as keyof zSection}
        render={({ field }) => {
          const bullets = (field.value as string[]) || []

          const addBullet = () => {
            field.onChange([...bullets, ""])
          }

          const removeBullet = (bulletIndex: number) => {
            field.onChange(bullets.filter((_, idx) => idx !== bulletIndex))
          }

          const updateBullet = (bulletIndex: number, value: string) => {
            const updatedBullets = bullets.map((bullet, idx) =>
              idx === bulletIndex ? value : bullet,
            )
            field.onChange(updatedBullets)
          }

          return (
            <FormItem>
              <FormLabel>{t("card-bullets-label")}</FormLabel>
              {bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex items-center space-x-2">
                  <span className="mr-2">{bulletIndex + 1}</span>
                  <FormControl>
                    <Input
                      value={bullet}
                      onChange={e => updateBullet(bulletIndex, e.target.value)}
                      placeholder={t("card-bullets-placeholder")}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => removeBullet(bulletIndex)}
                    className="ml-2 text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBullet}
                className="flex items-center text-blue-500"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                {t("card-bullets-add-bullet")}
              </button>
            </FormItem>
          )
        }}
      />

      {/* Delete Button */}
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={handleDelete.bind(null, card.uid, index)}
        className="absolute right-2 top-0"
        disabled={isDeleting}
      >
        <XCircle className="size-7" />
      </Button>
    </div>
  )
}
