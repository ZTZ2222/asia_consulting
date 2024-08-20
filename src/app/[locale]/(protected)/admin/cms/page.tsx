import { getTranslations } from "next-intl/server"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function CMS() {
  const t = await getTranslations()
  return (
    <Card>
      <CardHeader className="space-y-3.5">
        <CardTitle>{t("Pages.Admin.CMS.heading")}</CardTitle>
        <CardDescription>{t("Pages.Admin.CMS.subheading")}</CardDescription>
      </CardHeader>
    </Card>
  )
}
