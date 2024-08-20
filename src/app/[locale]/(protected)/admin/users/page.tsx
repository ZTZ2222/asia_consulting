import React, { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import Search from "@/components/ui/search"
import PaginationComponent from "@/components/layout/pagination-component"
import { db } from "@/server"
import SkeletonUserTable from "./_components/skeleton-user-table"
import UserTable from "./_components/user-table"

type Props = {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default async function Users({ searchParams }: Props) {
  const t = await getTranslations()
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  const totalCount = await db.user.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  })
  const totalPages = Math.ceil(totalCount / 10)

  return (
    <div className="flex h-full flex-col gap-4 py-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">
          {t("Pages.Admin.Users.title")}
        </h1>
        <div className="flex justify-end">
          <Search placeholder={t("Pages.Admin.Users.search-placeholder")} />
          <Button className="gap-2" asChild>
            <Link href="/admin/users/new">
              <PlusCircle className="size-5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t("Pages.Admin.Users.button-add-new")}
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<SkeletonUserTable />}>
        <UserTable query={query} currentPage={currentPage} />
      </Suspense>
      <PaginationComponent totalPages={totalPages} />
    </div>
  )
}
