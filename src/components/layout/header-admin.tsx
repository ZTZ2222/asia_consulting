"use client"

import React from "react"
import Link from "next/link"
import { House } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "@/lib/i18n-navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LocaleSwitcher from "@/components/shared/locale-switcher"

// import { ModeToggle } from "@/components/layout/mode-toggle"

export default function HeaderAdmin() {
  const t = useTranslations("Components.Breadcrumb")
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(segment => segment)

  // Remove the first segment if it is "admin" to handle only the relative paths after /admin
  if (pathSegments[0] === "admin") {
    pathSegments.shift()
  }

  const getBreadcrumbLink = (segment: string, index: number) => {
    const href = "/admin/" + pathSegments.slice(0, index + 1).join("/")
    return (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink asChild>
          <Link href={href}>
            {isNaN(Number(segment)) && segment.length !== 36
              ? t(segment)
              : segment}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }
  return (
    <header className="container flex items-center justify-between py-4">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem key="dashboard">
            <BreadcrumbLink asChild>
              <Link href="/admin">{t("dashboard")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              {index === pathSegments.length - 1 ? (
                <BreadcrumbItem key={segment}>
                  <BreadcrumbPage>
                    {isNaN(Number(segment)) && segment.length !== 36
                      ? t(segment)
                      : segment}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                getBreadcrumbLink(segment, index)
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <div className="relative flex items-center">
        <ModeToggle />
      </div> */}
      <div className="flex gap-8">
        <LocaleSwitcher className="py-2" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <House className="size-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("go-index-page")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
