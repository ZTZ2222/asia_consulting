"use client"

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
import { Badge } from "@/components/ui/badge"
import { changeClientRequestStatus } from "@/server/actions/request-action"

type Props = {
  applicationUid: number
  applicationStatus: "READ" | "UNREAD"
}

export default function ChangeStatusButton({
  applicationUid,
  applicationStatus,
}: Props) {
  const t = useTranslations("Components.FormRequest")
  const { execute, isExecuting, result } = useAction(
    changeClientRequestStatus,
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
  console.log(result)

  if (applicationStatus === "UNREAD") {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Badge variant="default">{t("unread")}</Badge>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-fit max-w-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-700">
              {t("mark-as-read")}?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Action to mark as read.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel>{t("button-cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => execute({ uid: applicationUid })}
              disabled={isExecuting}
            >
              {t("button-continue")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge variant="outline">{t("read")}</Badge>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-fit max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700">
            {t("mark-as-unread")}?
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Action to mark as read.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>{t("button-cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ uid: applicationUid })}
            disabled={isExecuting}
          >
            {t("button-continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
