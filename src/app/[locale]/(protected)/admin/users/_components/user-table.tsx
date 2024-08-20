import { FilePenIcon, TrashIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/server"

type Props = {
  query?: string
  currentPage?: number
}

export default async function UserTable({ query, currentPage }: Props) {
  const columns = [
    "Name",
    "Email",
    "Email Verified",
    "Registered",
    "Role",
    "Actions",
  ]

  // await sleepTimeout(3000)

  const users = await db.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    skip: (Number(currentPage) - 1) * 10,
    orderBy: {
      createdAt: "desc",
    },
  })

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
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.emailVerified ? (
                <Badge variant="default">
                  {user.emailVerified.toLocaleString("ru-RU", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Verified</Badge>
              )}
            </TableCell>
            <TableCell>
              {user.createdAt.toLocaleString("ru-RU", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell>
              <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <FilePenIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
