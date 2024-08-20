"use client"

import { ArrowDownRight } from "lucide-react"
import { useLocale } from "next-intl"
import { AppConfig } from "@/lib/i18n"
import { usePathname, useRouter } from "@/lib/i18n-navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LocaleSwitcher({
  className,
}: {
  className?: string
  asSelect?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value })
    router.refresh()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="support"
          size="mobile"
          className={cn("w-fit gap-2 px-[30px]", className)}
        >
          <span className="">{locale.toLocaleUpperCase()}</span>
          <ArrowDownRight className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(100vw-2rem)] lg:w-[128px]">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleChange}
          className="flex flex-col items-center"
        >
          {AppConfig.locales.map(elt => (
            <DropdownMenuRadioItem
              key={elt.id}
              value={elt.id}
              className="font-semibold"
            >
              {elt.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
