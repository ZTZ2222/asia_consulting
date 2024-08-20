import React from "react"
import { CircleCheck } from "lucide-react"

type FormSuccessProps = {
  message?: string
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-500">
      <CircleCheck />
      <p>{message}</p>
    </div>
  )
}
