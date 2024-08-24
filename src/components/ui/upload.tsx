"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ControllerRenderProps } from "react-hook-form"
import { toast } from "sonner"
import { UploadButton, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/shared/spinner"

type Props = {
  field: ControllerRenderProps<any, any>
  className?: string
}

export default function ImageUploadthing({ field, className }: Props) {
  const t = useTranslations("Components.Uploadthing")
  const [isDeleting, setIsDeleting] = useState(false)
  const handleImageDelete = async (image: string) => {
    setIsDeleting(true)
    const imageKey = image.substring(image.lastIndexOf("/") + 1)

    const res = await fetch(`/api/uploadthing`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageKey }),
    })

    if (res.ok) {
      field.onChange("")
      setIsDeleting(false)
    }
  }
  return (
    <div
      className={cn(
        "group relative grid size-32 place-content-center rounded-lg bg-gray-400",
        className,
      )}
    >
      {field.value ? (
        <AnimatePresence>
          <motion.div
            key={field.value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="group relative size-32 overflow-hidden rounded-lg bg-gray-400"
          >
            <Image
              src={field.value}
              alt={`User Avatar Image`}
              className="object-cover"
              fill
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </motion.div>
          <Button
            onClick={() => handleImageDelete(field.value)}
            type="button"
            variant="outline"
            size="icon"
            className="absolute left-1/2 top-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 bg-transparent p-5 opacity-0 transition-all group-hover:bg-white group-hover:opacity-100"
          >
            {isDeleting ? <Spinner /> : <Trash2 className="h-16 w-16" />}
          </Button>
        </AnimatePresence>
      ) : (
        <UploadButton
          key="upload-button"
          endpoint="imageUploader"
          onClientUploadComplete={res => {
            field.onChange(res[0].url)
            // setImage(res[0].url)
            toast.success(t("toast-upload-success"))
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`)
          }}
        />
      )}
    </div>
  )
}
