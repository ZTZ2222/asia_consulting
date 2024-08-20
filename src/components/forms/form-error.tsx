import React from "react"
import { TriangleAlert } from "lucide-react"

type FormErrorProps = {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  )
}
