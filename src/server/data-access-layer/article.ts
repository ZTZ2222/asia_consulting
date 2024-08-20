"use server"

import { getLocale } from "next-intl/server"
import { db } from "@/server"
import type { NormalizedArticleRead, zArticleRead } from "@/types/blog.schema"

export async function getArticleById(
  uid: number,
): Promise<zArticleRead | null> {
  try {
    const article = await db.article.findUnique({
      where: { uid },
      include: {
        socials: {
          orderBy: { uid: "asc" },
        },
      },
    })
    return article
  } catch (error) {
    return null
  }
}

export async function getNormalizedArticleById(
  uid: number,
): Promise<NormalizedArticleRead | null> {
  const locale = await getLocale()
  const article = await db.article.findUnique({
    where: { uid },
    include: {
      socials: {
        orderBy: { uid: "asc" },
      },
    },
  })

  if (!article) {
    return null
  }

  const title =
    (article[`title_${locale}` as keyof typeof article] as string | null) ||
    article.title_ru
  const content =
    (article[`content_${locale}` as keyof typeof article] as string | null) ||
    article.content_ru
  const image = article.image
  const linkTitle = article[`linkTitle_${locale}` as keyof typeof article] as
    | string
    | null
  const linkHref = article.linkHref

  return {
    uid: article.uid,
    title,
    content,
    image,
    linkTitle,
    linkHref,
    status: article.status,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    socials: article.socials,
  }
}

export async function getNormalizedArticles(
  currentPage: number = 1,
  query?: string,
  publicOnly: boolean = true,
): Promise<NormalizedArticleRead[]> {
  const locale = await getLocale()

  const articles = await db.article.findMany({
    where: {
      ...(publicOnly && { status: "PUBLISHED" }),
      ...(query && {
        OR: [
          {
            title_ru: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            title_ky: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    take: 10,
    skip: (Number(currentPage) - 1) * 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      socials: {
        orderBy: { uid: "asc" },
      },
    },
  })

  return articles.map(article => {
    const title =
      (article[`title_${locale}` as keyof typeof article] as string | null) ||
      article.title_ru
    const content =
      (article[`content_${locale}` as keyof typeof article] as string | null) ||
      article.content_ru
    const image = article.image
    const linkTitle = article[`linkTitle_${locale}` as keyof typeof article] as
      | string
      | null
    const linkHref = article.linkHref

    return {
      uid: article.uid,
      title,
      content,
      image,
      linkTitle,
      linkHref,
      status: article.status,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      socials: article.socials,
    }
  })
}
