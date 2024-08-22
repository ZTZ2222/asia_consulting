import React, { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import Search from "@/components/ui/search"
import PaginationComponent from "@/components/layout/pagination-component"
import { db } from "@/server"
import RequestTable from "./_components/request-table"
import SkeletonRequestTable from "./_components/skeleton-request-table"

type Props = {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default async function RequestList({ searchParams }: Props) {
  const t = await getTranslations()
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  const totalCount = await db.clientRequest.count({
    where: {
      OR: [
        {
          firstName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  })
  const totalPages = Math.ceil(totalCount / 10)

  return (
    <div className="flex min-h-[calc(100vh-170px)] flex-col gap-4 py-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">
          {t("Pages.Admin.Request.title")}
        </h1>
        <div className="flex justify-end">
          <Search placeholder={t("Pages.Admin.Request.search-placeholder")} />
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<SkeletonRequestTable />}>
        <RequestTable query={query} currentPage={currentPage} />
      </Suspense>
      <PaginationComponent totalPages={totalPages} />
    </div>
  )
}
