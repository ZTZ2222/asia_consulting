import { getTranslations } from "next-intl/server"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AdvancedSettingsForm from "./form"

export default async function AdvancedSettings() {
  const t = await getTranslations()
  return (
    <Card>
      <CardHeader className="space-y-3.5">
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Manage the overall settings of your application. This section includes
          options for configuring site information and appearance.
        </CardDescription>
      </CardHeader>
      <AdvancedSettingsForm />
    </Card>
  )
}
