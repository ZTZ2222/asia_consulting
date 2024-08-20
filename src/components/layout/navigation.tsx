"use client"

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
import { BurgerMenu } from "@/components/icons"
import LocaleSwitcher from "@/components/shared/locale-switcher"
import ScrollLink from "@/components/shared/scroll-link"

export default function Navigation({ logo }: { logo?: string }) {
  const t = useTranslations("Components.NavigationLinks")
  const links = [
    {
      name: t("services"),
      href: "our-services",
    },
    {
      name: t("plans"),
      href: "plans",
    },
    {
      name: t("blog"),
      href: "blog",
    },
    {
      name: t("team"),
      href: "our-team",
    },
    {
      name: t("contacts"),
      href: "contacts",
    },
  ]
  return (
    <>
      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="support"
            size="menu"
            // className="border-none"
          >
            <BurgerMenu />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full px-4 py-[30px] xl:hidden" logo={logo}>
          <SheetHeader className="sr-only">
            <SheetTitle>Меню навигации</SheetTitle>
            <SheetDescription>Открыть меню навигации</SheetDescription>
          </SheetHeader>
          {/* Links */}
          <nav className="mb-[50px] flex flex-col items-center">
            {links.map(link => (
              <ScrollLink key={link.name} href={link.href}>
                <SheetClose className="px-[30px] py-[18px]">
                  {link.name}
                </SheetClose>
              </ScrollLink>
            ))}
          </nav>
          <SheetFooter className="w-full items-center gap-5">
            <LocaleSwitcher />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <nav className="hidden shrink-0 items-center overflow-hidden rounded-lg bg-white/80 lg:flex">
        {links.map(link => (
          <ScrollLink
            key={link.name}
            href={link.href}
            className="px-[20px] py-[14px] transition-colors hover:bg-black/80 hover:text-white lg:py-[22px] xl:px-[30px]"
          >
            {link.name}
          </ScrollLink>
        ))}
      </nav>
      <LocaleSwitcher className="ml-2.5 hidden lg:inline-flex xl:ml-5" />
    </>
  )
}
