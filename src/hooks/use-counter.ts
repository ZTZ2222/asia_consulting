import { useEffect, useState } from "react"
import { getUnreadRequestsCount } from "@/server/data-access-layer/request"

/**
 * Custom hook for fetching and managing an unread requests count
 * @returns {number | null} The current count of unread requests, or null if not yet loaded
 */
export function useCounter() {
  const [count, setCount] = useState<number | null>(null)

  /**
   /**
    * Asynchronously fetches and sets the count of unread requests.
    * @returns {Promise<void>} A promise that resolves when the count is updated.
    */
   * Fetches and sets the count of unread requests when the component mounts
   * @returns {void} This effect does not return anything
   */
  useEffect(() => {
    async function getData() {
      const data = await getUnreadRequestsCount()
      setCount(data)
    }

    getData()
  }, [])

  return count
}
