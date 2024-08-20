"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  const { back } = useRouter()
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={back}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only">Back</span>
    </Button>
  )
}
