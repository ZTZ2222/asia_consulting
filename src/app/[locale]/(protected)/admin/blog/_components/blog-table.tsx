import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getNormalizedArticles } from "@/server/data-access-layer/article"
import ActionButtonGroup from "./action-button-group"

type Props = {
  query?: string
  currentPage?: number
}

export default async function BlogTable({ query, currentPage }: Props) {
  const locale = await getLocale()
  const t = await getTranslations()
  const columns = [
    t("Components.FormArticle.column-title"),
    t("Components.FormArticle.column-date"),
    t("Components.FormArticle.column-status"),
    t("Components.FormArticle.column-actions"),
  ]

  // await sleepTimeout(3000)

  const articles = await getNormalizedArticles(currentPage, query, false)

  return (
    <Table className="flex-1 overflow-auto rounded-lg bg-muted">
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map(article => (
          <TableRow key={article.uid}>
            <TableCell>
              <Link href={`/admin/blog/${article.uid}`}>{article.title}</Link>
            </TableCell>
            <TableCell>{article.createdAt.toLocaleString(locale)}</TableCell>
            <TableCell>
              {article.status === "PUBLISHED" ? (
                <Badge variant="default">
                  {t("Components.FormArticle.status-published")}
                </Badge>
              ) : article.status === "ARCHIVED" ? (
                <Badge variant="destructive">
                  {t("Components.FormArticle.status-archived")}
                </Badge>
              ) : (
                <Badge variant="outline">
                  {t("Components.FormArticle.status-draft")}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <ActionButtonGroup articleId={article.uid} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
