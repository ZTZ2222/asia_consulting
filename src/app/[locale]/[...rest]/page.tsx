import Link from "next/link"
import { getTranslations } from "next-intl/server"

// import { Footer } from "@/components/footer"
// import { Header } from "@/components/header"
// import { Title } from "@/components/title"

export default async function Error404() {
  const t = await getTranslations()
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="grow">
        <div className="container space-y-8 py-24 text-center">
          <p className="text-6xl">{t("Pages.Page404.title")}</p>

          <h1 className="text-3xl">{t("Pages.Page404.description")}</h1>
          <div>
            <Link href="/">{t("Pages.Page404.link")}</Link>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
