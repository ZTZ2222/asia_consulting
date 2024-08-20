import { useEffect, useState } from "react"
import { getUnreadRequestsCount } from "@/server/data-access-layer/request"

export function useCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function getData() {
      const data = await getUnreadRequestsCount()
      setCount(data)
    }

    getData()
  }, [])

  return count
}
