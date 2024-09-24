"use server"

import { getLocale } from "next-intl/server"
import { db } from "@/server"
import type { NormalizedArticleRead, zArticleRead } from "@/types/blog.schema"

/**
 * Retrieves an article by its unique identifier from the database.
 * @param {number} uid - The unique identifier of the article to retrieve.
 * @returns {Promise<zArticleRead | null>} A promise that resolves to the article object if found, or null if not found or an error occurs.
 */
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
  /**
   * Retrieves a normalized article by its unique identifier.
   * @param {number} uid - The unique identifier of the article to retrieve.
   * @returns {Promise<NormalizedArticleRead | null>} A Promise that resolves to a normalized article object if found, or null if not found.
   */
  } catch (error) {
    return null
  }
}

/**
 * Retrieves and normalizes an article by its unique identifier.
 * @param {number} uid - The unique identifier of the article to retrieve.
 * @returns {Promise<NormalizedArticleRead | null>} A promise that resolves to a normalized article object if found, or null if not found.
 */
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
    /**
     * Retrieves and normalizes articles based on specified criteria.
     * @param {number} [currentPage=1] - The current page number for pagination.
     * @param {string} [query] - Optional search query to filter articles by title.
     * @param {boolean} [publicOnly=true] - Whether to return only published articles.
     * @returns {Promise<NormalizedArticleRead[]>} A promise that resolves to an array of normalized article objects.
     */
    image,
    linkTitle,
    linkHref,
    status: article.status,
    createdAt: article.createdAt,
    /**
     * Retrieves and normalizes articles based on specified criteria.
     * @param {number} [currentPage=1] - The current page number for pagination.
     * @param {string} [query] - Optional search query to filter articles.
     * @param {boolean} [publicOnly=true] - Whether to return only published articles.
     * @returns {Promise<NormalizedArticleRead[]>} A promise that resolves to an array of normalized article objects.
     */
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

  /**
   * Maps an array of articles to a new array with localized content
   * @param {Array} articles - The original array of article objects
   * @param {string} locale - The current locale for content selection
   * @returns {Array} An array of transformed article objects with localized content
   */
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
