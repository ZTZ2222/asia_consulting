import { getTranslations } from "next-intl/server"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMetadata } from "@/server/data-access-layer/content"
import MetadataForm from "./form-meta"

export default async function Settings() {
  const t = await getTranslations()
  const metaData = await getMetadata()
  return (
    <Card>
      <CardHeader className="space-y-3.5">
        <CardTitle>
          {t("Pages.Admin.Settings.general-settings-title")}
        </CardTitle>
        <CardDescription>
          {t("Pages.Admin.Settings.general-settings-description")}
        </CardDescription>
      </CardHeader>
      <MetadataForm metaData={metaData} />
    </Card>
  )
}
