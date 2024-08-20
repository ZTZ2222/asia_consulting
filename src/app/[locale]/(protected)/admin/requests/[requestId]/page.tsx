import React from "react"
import { getClientRequestById } from "@/server/data-access-layer/request"
import UpdateRequestForm from "./form"

type Props = {
  params: {
    requestId: string
  }
}

export default async function RequestEditPage({ params }: Props) {
  const request = await getClientRequestById(Number(params.requestId))
  if (!request)
    return (
      <div className="p-10 text-center text-2xl text-red-500">
        Request {params.requestId} not found
      </div>
    )
  return <UpdateRequestForm request={request} />
}
