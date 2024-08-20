"use client"

import React from "react"
import Link from "next/link"
import { FilePen, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteClientRequest } from "@/server/actions/request-action"

export default function ActionButtonGroup({
  requestId,
}: {
  requestId: number
}) {
  const t = useTranslations("Components.FormRequest")

  const { execute, isExecuting } = useAction(deleteClientRequest, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success)
      }
    },
  })
  function handleDelete() {
    execute({ uid: requestId })
  }
  return (
    <div className="flex items-center justify-center gap-2">
      {/* <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/requests/${requestId}`}>
          <FilePen className="h-4 w-4" />
        </Link>
      </Button> */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("alert-title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("alert-description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDelete} disabled={isExecuting}>
              {t("button-continue")}
            </AlertDialogAction>
            <AlertDialogCancel>{t("button-cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
