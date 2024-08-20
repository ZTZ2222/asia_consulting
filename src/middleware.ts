import createMiddleware from "next-intl/middleware"
import { auth as authMiddleware } from "@/server/auth"
import { AllLocales, AppConfig } from "./lib/i18n"

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
})

export default authMiddleware(request => {
  return intlMiddleware(request)
})

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
