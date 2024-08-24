"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClientRequest } from "@/server/actions/request-action"
import type { NormalizedCard } from "@/types/content.schema"
import {
  clientRequestCreateSchema,
  type zClientRequestСreate,
} from "@/types/request.schema"

type Props = {
  btnText: string | undefined | null
  card: NormalizedCard | undefined
  className?: string
}

export default function FormRequest({ btnText, card, className }: Props) {
  const t = useTranslations("Components.FormRequest")
  const form = useForm<zClientRequestСreate>({
    resolver: zodResolver(clientRequestCreateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      accepted_privacy_policy: false,
    },
  })

  const { execute, isExecuting } = useAction(createClientRequest, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
        form.reset()
      }
    },
  })

  function onSubmit(values: zClientRequestСreate) {
    // toast(JSON.stringify(values))
    execute(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-5 rounded-[32px] bg-gray-200 px-4 py-10 text-blue-950 shadow-lg md:px-10 lg:px-20 xl:px-36",
          className,
        )}
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-5 lg:space-y-8">
            <div className="grid gap-5 lg:grid-cols-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name-label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("name-placeholder")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone-label")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Азаматов" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label-email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="azamatov@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  <p className="mb-2">{card?.title}</p>
                  <p>{card?.description}</p>
                  <p>{card?.extra}</p>
                </FormLabel>
                <ul className="list-inside list-decimal text-sm text-[#475467]">
                  {card?.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
                <FormControl>
                  <Textarea
                    placeholder="Ваше сообщение..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Privacy Policy */}
        <FormField
          control={form.control}
          name="accepted_privacy_policy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t("label-privacy-policy")}</FormLabel>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="core"
          size="lg"
          className="h-11 w-full"
          disabled={isExecuting}
        >
          {btnText || t("button-send-request")}
        </Button>
      </form>
    </Form>
  )
}
