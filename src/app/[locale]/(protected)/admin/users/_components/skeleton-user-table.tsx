import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SkeletonUserTable() {
  const columns = [
    "Name",
    "Email",
    "Email Verified",
    "Registered",
    "Role",
    "Actions",
  ]
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
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-20 bg-background" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 bg-background" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[22px] w-24 bg-background" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 bg-background" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[22px] w-16 bg-background" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 bg-background" />
                <Skeleton className="size-4 bg-background" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
