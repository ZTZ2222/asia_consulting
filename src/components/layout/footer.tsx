import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { getMetadata, getSocials } from "@/server/data-access-layer/content"

export default async function Footer() {
  const t = await getTranslations()
  const locale = await getLocale()
  const socials = await getSocials()
  const logo = (await getMetadata())?.logo1
  return (
    <footer className="rounded-t-[30px] bg-gradient-to-r from-rose-750 to-[#860525]">
      <div className="container my-[50px] flex flex-col gap-[70px] xl:my-[60px] xl:flex-row xl:gap-[80px]">
        <div className="relative size-20">
          <Image
            src={logo || ""}
            alt="AR Finance Logo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div
          id="contacts"
          className="flex flex-col gap-4 text-lg text-[#E0E0E0]"
        >
          <h3 className="font-bold text-white">
            {t("Components.Footer.our-contacts")}
          </h3>
        </div>
        <div className="flex flex-col gap-4 text-lg text-white">
          <h3 className="font-bold">{t("Components.Footer.our-socials")}</h3>
          <div className="flex gap-2">
            {socials?.map((social, index) => (
              <Link key={index} href={social.link} target="_blank">
                <div className="relative size-12">
                  <Image
                    src={social.icon || ""}
                    alt={social.name || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
