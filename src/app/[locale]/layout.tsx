import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { notFound } from "next/navigation"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Toaster } from "sonner"
import { extractRouterConfig } from "uploadthing/server"
import { AllLocales } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { AuthProvider } from "@/context/auth-provider"
import { getMetadata } from "@/server/data-access-layer/content"
// import { ThemeProvider } from "@/context/theme-provider"
import "@/styles/globals.css"
import type { zMetaRead } from "@/types/content.schema"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations()
  const metadata = await getMetadata()
  if (!metadata)
    return {
      title: t("Meta.title"),
      description: t("Meta.description"),
    }
  return {
    title: metadata[`title_${params.locale}` as keyof zMetaRead] as string,
    description: metadata[
      `description_${params.locale}` as keyof zMetaRead
    ] as string,
    keywords: metadata[
      `keywords_${params.locale}` as keyof zMetaRead
    ] as string,
    openGraph: {
      images: [metadata.ogImage!],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()
  if (!AllLocales.includes(params.locale)) notFound()
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-[#F9FAFB] font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* SSR Plugin for UploadThing */}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

        {/* Auth and Internationalization Providers */}
        <AuthProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            {children}
            <Toaster position="top-right" richColors />
          </NextIntlClientProvider>
          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  )
}
