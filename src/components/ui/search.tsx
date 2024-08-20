"use client"

import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "@/lib/i18n-navigation"
import { SearchIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      const term: string = e.target.value
      params.set("page", "1")
      if (term) {
        params.set("query", term)
      } else {
        params.delete("query")
      }
      replace(`${pathname}?${params.toString()}`)
    },
    300,
  )
  return (
    <div className="relative mr-4 flex h-fit">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="rounded-lg bg-muted py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  )
}
