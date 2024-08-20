import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import HeaderAdmin from "@/components/layout/header-admin"
import { SidebarAdmin } from "@/components/layout/sidebar-admin"
import { getUnreadRequestsCount } from "@/server/data-access-layer/request"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  const count = await getUnreadRequestsCount()

  return (
    <SidebarAdmin count={count}>
      <div className="flex h-screen w-full flex-col bg-muted">
        <HeaderAdmin />
        <main className="container overflow-auto pb-20">{children}</main>
      </div>
    </SidebarAdmin>
  )
}
