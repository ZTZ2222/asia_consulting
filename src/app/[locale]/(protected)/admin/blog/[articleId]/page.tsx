import React from "react"
import { getArticleById } from "@/server/data-access-layer/article"
import UpdateArticleForm from "./form"

type Props = {
  params: {
    articleId: string
  }
}

export default async function ArticleEditPage({ params }: Props) {
  const article = await getArticleById(Number(params.articleId))
  if (!article)
    return (
      <div className="p-10 text-center text-2xl text-red-500">
        Article {params.articleId} not found
      </div>
    )
  return <UpdateArticleForm article={article} />
}
