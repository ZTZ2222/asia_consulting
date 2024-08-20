import { type FileRouter, createUploadthing } from "uploadthing/next"
import { auth } from "@/server/auth"

const f = createUploadthing()

const middleware = async () => {
  const session = await auth()
  if (!session?.user) throw new Error("Not Authorized")
  return { userId: session.user.id }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
