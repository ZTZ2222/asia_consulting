"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { NormalizedArticleRead } from "@/types/blog.schema"

type BlogCardProps = NormalizedArticleRead & {
  size?: "sm" | "md"
  className?: string
}

export default function BlogCard({
  uid,
  title,
  content,
  image,
  createdAt,
  updatedAt,
  size = "md",
  className,
}: BlogCardProps) {
  const locale = useLocale()
  const t = useTranslations()
  return (
    <Link
      href={`/blog/${uid}`}
      className={cn(
        "shrink-0 space-y-8 lg:max-w-[317px] xl:max-w-[402px]",
        size === "sm" ? "max-w-[300px]" : "",
        className,
      )}
    >
      {/* Image */}
      <div className={cn("relative h-[240px] overflow-hidden rounded-lg")}>
        <Image
          src={image}
          alt={`Blog #${uid} image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5">
        <span className="text-sm font-medium leading-[18.2px] text-rose-750">
          {updatedAt?.toLocaleDateString(locale) ||
            createdAt.toLocaleDateString(locale)}
        </span>
        <div className="flex gap-4">
          <h4 className="line-clamp-2 text-lg font-bold leading-[21.6px] text-black">
            {title}
          </h4>
          <ArrowUpRight className="size-6 shrink-0" />
        </div>
        <div
          className="line-clamp-3 text-gray-650"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="text-end font-semibold leading-5 text-gray-650">
          {t("Components.Button.read-more")}
        </div>
      </div>
    </Link>
  )
}
