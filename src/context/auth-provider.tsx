import { SessionProvider } from "next-auth/react"
import { auth } from "@/server/auth"

/**
 * Provides authentication context for the application
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped with authentication context
 * @returns {Promise<JSX.Element>} A Promise that resolves to the SessionProvider component with authentication context
 */
export async function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return <SessionProvider session={session}>{children}</SessionProvider>
}
