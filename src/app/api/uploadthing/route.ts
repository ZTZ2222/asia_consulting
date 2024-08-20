import { NextResponse } from "next/server"
import { createRouteHandler } from "uploadthing/next"
import { UTApi } from "uploadthing/server"
import { ourFileRouter } from "./core"

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})

export async function DELETE(request: Request) {
  const { imageKey } = await request.json()

  const utapi = new UTApi()
  try {
    await utapi.deleteFiles(imageKey)
    return NextResponse.json({ message: "ok" }, { status: 200 })
  } catch (error) {
    console.log("error at uploadthing/delete", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
