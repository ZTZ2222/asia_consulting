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
    t("Components.FormRequest.phone"),
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
                {request.name}
              </Link>
            </TableCell>
            <TableCell>{request.contactPhone}</TableCell>
            <TableCell className="flex max-w-[350px] flex-wrap gap-2">
              {request.Plan && (
                <Badge variant="outline">{request.Plan.title_ru}</Badge>
              )}
              {request.additionalInfo && (
                <Badge variant="outline">{request.additionalInfo}</Badge>
              )}
              {request.FormOfOwnership && (
                <Badge variant="outline">
                  {request.FormOfOwnership.name_ru}
                </Badge>
              )}
              {request.FieldOfActivity && (
                <Badge variant="outline">
                  {request.FieldOfActivity.name_ru}
                </Badge>
              )}
              {request.TaxSystem && (
                <Badge variant="outline">{request.TaxSystem.name_ru}</Badge>
              )}
              {request.EmployeeRange && (
                <Badge variant="outline">{request.EmployeeRange.range}</Badge>
              )}
              {request.TimePeriod && (
                <Badge variant="outline">{request.TimePeriod.period_ru}</Badge>
              )}
            </TableCell>
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
