"use server"

import { db } from "@/server"

export async function getClientRequests(
  currentPage: number = 1,
  query?: string,
) {
  try {
    const clientRequests = await db.clientRequest.findMany({
      where: {
        ...(query && {
          OR: [
            {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      take: 10,
      skip: (Number(currentPage) - 1) * 10,
      orderBy: {
        createdAt: "desc",
      },
    })
    if (clientRequests.length === 0) return null

    return clientRequests
  } catch (error) {
    return null
  }
}

export async function getClientRequestById(uid: number) {
  try {
    const clientRequest = await db.clientRequest.findUnique({
      where: { uid },
    })
    if (!clientRequest) return null
    return clientRequest
  } catch (error) {
    return null
  }
}

export async function getUnreadRequestsCount() {
  try {
    const count = await db.clientRequest.count({ where: { status: "UNREAD" } })
    return count
  } catch (error) {
    console.error("Failed to fetch counter data:", error)
    return null
  }
}
