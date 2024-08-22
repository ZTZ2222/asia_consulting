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
import { getClientRequests } from "@/server/data-access-layer/request"
import ActionButtonGroup from "./action-button-group"
import ChangeStatusButton from "./change-status"

type Props = {
  query?: string
  currentPage?: number
}

export default async function RequestTable({ query, currentPage }: Props) {
  const locale = await getLocale()
  const t = await getTranslations()
  const columns = [
    t("Components.FormRequest.title"),
    t("Components.FormRequest.last-name"),
    t("Components.FormRequest.column-email"),
    t("Components.FormRequest.contents-of-the-application"),
    t("Components.FormRequest.date"),
    t("Components.FormRequest.status"),
    t("Components.FormArticle.column-actions"),
  ]

  const clientRequests = await getClientRequests(currentPage, query)

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
        {clientRequests?.map(request => (
          <TableRow key={request.uid}>
            <TableCell>
              <Link href={`/admin/requests/${request.uid}`}>
                {request.firstName}
              </Link>
            </TableCell>
            <TableCell>{request.lastName}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>{request.message}</TableCell>
            <TableCell>
              {request.createdAt.toLocaleDateString(locale)}
            </TableCell>
            <TableCell>
              <ChangeStatusButton
                applicationUid={request.uid}
                applicationStatus={request.status}
              />
            </TableCell>
            <TableCell>
              <ActionButtonGroup requestId={request.uid} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
