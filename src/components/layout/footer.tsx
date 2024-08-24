import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import ScrollLink from "@/components/shared/scroll-link"
import { getMetadata, getSocials } from "@/server/data-access-layer/content"

export default async function Footer() {
  const socials = await getSocials()
  const logo = (await getMetadata())?.logo1
  const links = [
    {
      name: "Главная",
      href: "hero",
    },
    {
      name: "О нас",
      href: "about-us",
    },
    {
      name: "Инвестиции",
      href: "investment",
    },
    {
      name: "Что мы предлагаем",
      href: "our-services",
    },
    {
      name: "Наши контакты",
      href: "contacts",
    },
  ]
  return (
    <footer className="border-t border-red-550 py-12">
      <div className="container flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="space-y-8">
          <div className="relative h-32 w-60">
            <Image
              src={logo || "/assets/image_logo.png"}
              alt="Asia Consulting Logo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            {links.map(link => (
              <ScrollLink
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-blue-950"
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {socials?.map((social, index) => (
            <Link
              key={index}
              href={social.link}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="relative size-6">
                <Image
                  src={social.icon || "/assets/placeholder-gray.svg"}
                  alt={social.name || `social ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p>{social.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
