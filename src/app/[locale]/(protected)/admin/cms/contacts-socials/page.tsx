import { getTranslations } from "next-intl/server"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSocials } from "@/server/data-access-layer/content"
import SocialsForm from "./form-socials"

export default async function AdminNavigation() {
  const t = await getTranslations()
  const socials = await getSocials()
  return (
    <div className="space-y-10">
      <Card className="mb-10 lg:my-0">
        <CardHeader>
          <CardTitle>
            {t("Pages.Admin.CMS.ContactsAndSocials.heading")}
          </CardTitle>
          <CardDescription>
            {t("Pages.Admin.CMS.ContactsAndSocials.subheading")}
          </CardDescription>
        </CardHeader>
        {socials && <SocialsForm socialsData={socials} />}
      </Card>
    </div>
  )
}
