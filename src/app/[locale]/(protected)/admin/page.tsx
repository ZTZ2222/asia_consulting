import { getTranslations } from "next-intl/server"

export default async function Dashboard() {
  const t = await getTranslations()
  return <div className="text-2xl">{t("Pages.Admin.Dashboard.heading")}</div>
}
