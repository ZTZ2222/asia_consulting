"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClientRequest } from "@/server/actions/request-action"
import type { zServiceCost } from "@/types/calculator.schema"
import {
  clientRequestCreateSchema,
  type zClientRequestСreate,
} from "@/types/request.schema"

type AdditionalInfo =
  | zServiceCost
  | { planId: number }
  | { additionalInfo: string }

type Props = {
  btnText: string | undefined | null
  additionalInfo: AdditionalInfo
  className?: string
}

export default function FormRequest({
  btnText,
  additionalInfo,
  className,
}: Props) {
  const t = useTranslations("Components.FormRequest")
  const form = useForm<zClientRequestСreate>({
    resolver: zodResolver(clientRequestCreateSchema),
    defaultValues: {
      name: "",
      contactPhone: "",
      ...additionalInfo,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="core"
          size="mobile"
          className={cn("", className)}
          disabled={isExecuting}
        >
          {btnText || "Button"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name-label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name-placeholder")} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone-label")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+996 555 555 555" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit" variant="core" size="mobile" className="">
                {t("get-an-offer")}
              </Button>
            </DialogClose>
          </form>
        </Form>
        <DialogHeader>
          <DialogTitle className="sr-only">Request Form</DialogTitle>
          <DialogDescription className="sr-only">
            Request Form
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
