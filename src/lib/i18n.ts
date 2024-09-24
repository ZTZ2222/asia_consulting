import { notFound } from "next/navigation"
import { IntlErrorCode } from "next-intl"
import { LocalePrefix } from "next-intl/routing"
import { getRequestConfig } from "next-intl/server"

const localePrefix: LocalePrefix = "as-needed"

export const AppConfig = {
  name: "Asia Consulting",
  locales: [
    {
      id: "ru",
      name: "Русский",
    },
    {
      id: "ky",
      name: "Кыргызча",
    },
  ],
  defaultLocale: "ru",
  localePrefix,
}

/**
 * Returns an array of all locale IDs defined in the application configuration.
 ```
 /**
  * Configures and returns internationalization settings for the application.
  * @param {Object} options - The configuration options.
  * @param {string} options.locale - The locale code to use for translations.
  * @returns {Object} An object containing message translations, error handling, and fallback functions.
  */
 ``` * @returns {string[]} An array containing the IDs of all available locales.
 */
export const AllLocales = AppConfig.locales.map(locale => locale.id)

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!AllLocales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        /**
         * Generates an internationalized URL path based on the given URL and locale.
         * @param {string} url - The original URL path to be internationalized.
         * @param {string} locale - The locale code to be used for internationalization.
         * @returns {string} The internationalized URL path. If the locale is the default locale, the original URL is returned. Otherwise, the locale is prepended to the URL.
         */
        console.log(error)
      } else {
        console.log(error)
      }
    },
    getMessageFallback({ namespace, key, error }) {
      return key
    },
  }
})

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url
  }

  return `/${locale}${url}`
}
