import { getTranslations } from "next-intl/server"
import ContentNavigation from "@/components/layout/content-navigation"

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations()
  const settingsSections = [
    {
      title: t("Pages.Admin.Settings.Navigation.general"),
      href: "/admin/settings",
    },
    // {
    //   title: t("Pages.Admin.Settings.Navigation.security"),
    //   href: "/admin/settings/security",
    // },
    // {
    //   title: t("Pages.Admin.Settings.Navigation.advanced"),
    //   href: "/admin/settings/advanced",
    // },
  ]
  return (
    <div className="flex flex-1 flex-col gap-4 bg-muted/40 md:gap-8">
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {t("Pages.Admin.Settings.title")}
        </h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[140px_1fr]">
        <ContentNavigation sections={settingsSections} />
        {children}
      </div>
    </div>
  )
}
