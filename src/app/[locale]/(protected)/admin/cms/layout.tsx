import { getTranslations } from "next-intl/server"
import ContentNavigation from "@/components/layout/content-navigation"

export default async function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations()
  const sections = [
    {
      title: t("Pages.Admin.CMS.Navigation.hero"),
      href: "/admin/cms/hero",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.about-us"),
      href: "/admin/cms/about-us",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.our-services"),
      href: "/admin/cms/our-services",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.why-us"),
      href: "/admin/cms/why-us",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.certificates"),
      href: "/admin/cms/certificates",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.faq"),
      href: "/admin/cms/faq",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.blog"),
      href: "/admin/cms/blog",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.cta"),
      href: "/admin/cms/cta",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.contacts-socials"),
      href: "/admin/cms/contacts-socials",
    },
    {
      title: t("Pages.Admin.CMS.Navigation.meta"),
      href: "/admin/settings",
    },
  ]
  return (
    <div className="flex flex-1 flex-col gap-4 bg-muted/40 md:gap-8">
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {t("Pages.Admin.CMS.title")}
        </h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <ContentNavigation sections={sections} />
        {children}
      </div>
    </div>
  )
}
