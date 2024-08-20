"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"

type Props = {
  className?: string
}

type FormValues = {}

export default function AdvancedSettingsForm({ className }: Props) {
  // const t = useTranslations("Components.FormSettings")
  const form = useForm<FormValues>({
    defaultValues: {},
  })

  function onSubmit(data: FormValues) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <CardContent className="space-y-10">Advanced Settings Form</CardContent>
      </form>
    </Form>
  )
}
