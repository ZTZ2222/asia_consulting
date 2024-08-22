"use client"

import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import LocaleSwitcher from "@/components/shared/locale-switcher"
import ScrollLink from "@/components/shared/scroll-link"

export default function Navigation({
  logo,
}: {
  logo: string | null | undefined
}) {
  const t = useTranslations("Components.NavigationLinks")
  const links = [
    {
      name: "Главная",
      href: "hero",
    },
    {
      name: "О нас",
      href: "about-us",
    },
    {
      name: "Инвестиции",
      href: "investment",
    },
    {
      name: "Что мы предлагаем",
      href: "our-services",
    },
    {
      name: t("contacts"),
      href: "contact",
    },
  ]
  return (
    <>
      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="menu"
            // className="border-none"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-full bg-white/70 p-0 backdrop-blur-md xl:hidden"
          logo={logo}
        >
          {/* SR ONLY */}
          <SheetHeader className="sr-only">
            <SheetTitle>Меню навигации</SheetTitle>
            <SheetDescription>Открыть меню навигации</SheetDescription>
          </SheetHeader>
          <div className="mt-[65px] flex h-[75%] flex-col justify-between">
            {/* Links */}
            <nav className="flex flex-col items-center">
              {links.map(link => (
                <ScrollLink key={link.name} href={link.href}>
                  <SheetClose className="px-[30px] py-4">
                    {link.name}
                  </SheetClose>
                </ScrollLink>
              ))}
            </nav>
            <SheetFooter className="flex w-full justify-center">
              <LocaleSwitcher className="h-[36px] w-[175px]" />
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <nav className="hidden shrink-0 items-center lg:flex lg:flex-1 lg:justify-between">
        <div className="flex">
          {links.map(link => (
            <ScrollLink
              key={link.name}
              href={link.href}
              className="px-[20px] py-[14px] transition-colors hover:bg-black/80 hover:text-white lg:p-4"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>
        <LocaleSwitcher />
      </nav>
    </>
  )
}
