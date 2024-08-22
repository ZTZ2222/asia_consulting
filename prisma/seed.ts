import { PrismaClient } from "@prisma/client"
import type { zSection, zSocial } from "@/types/content.schema"

const prisma = new PrismaClient()

async function seedSections() {
  const sections: zSection[] = [
    {
      uid: 1,
      slug: "hero",
      sectionName_ru: "Лицевая секция",
      sectionName_ky: "Лицевая секция",
      heading_ru: "Привлечём инвестиции для роста вашего бизнеса от 1 000 000$",
      heading_ky: "Привлечём инвестиции для роста вашего бизнеса от 1 000 000$",
      subheading_ru: null,
      subheading_ky: null,
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [],
    },
    {
      uid: 2,
      slug: "about-us",
      sectionName_ru: "О нас",
      sectionName_ky: "Биз жөнүндө",
      heading_ru: "О нашей компании",
      heading_ky: "О нашей компании",
      subheading_ru:
        "Основным направлением деятельности нашей компании является привлечение инвестиций из-за рубежа, развитие экономики Кыргызстана, бизнес-консультация и проведение аудитов.  Мы являемся первой компанией в Кыргызстане, которая привлекает инвестиции от 1 000 000$ и выше! Единственная компания, которая имеет официальное представительство во Франции, а также сотрудничество с компаниями «Medef» и «Finentrep Aspir». Мы готовим бизнес-план по евро стандартам, презентуем Ваш проект и защищаем перед инвесторами. Мы гарантируем встречу с инвесторам для обсуждения Вашего проекта. Все условия ставит инвестора. Вы лично с инвестором обсудите и придете к одному соглашению.",
      subheading_ky:
        "Основным направлением деятельности нашей компании является привлечение инвестиций из-за рубежа, развитие экономики Кыргызстана, бизнес-консультация и проведение аудитов.  Мы являемся первой компанией в Кыргызстане, которая привлекает инвестиции от 1 000 000$ и выше! Единственная компания, которая имеет официальное представительство во Франции, а также сотрудничество с компаниями «Medef» и «Finentrep Aspir». Мы готовим бизнес-план по евро стандартам, презентуем Ваш проект и защищаем перед инвесторами. Мы гарантируем встречу с инвесторам для обсуждения Вашего проекта. Все условия ставит инвестора. Вы лично с инвестором обсудите и придете к одному соглашению.",
      primaryButton_ru: "Оставить заявку",
      primaryButton_ky: "Оставить заявку",
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 2,
          title_ru: "Выгодные условия",
          title_ky: "Выгодные условия",
          description_ru:
            "Сопровождение Вашего проекта на протяжении всего процесса получения инвестиций",
          description_ky:
            "Сопровождение Вашего проекта на протяжении всего процесса получения инвестиций",
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 2,
          title_ru: "Сводим с прямым инвестором",
          title_ky: "Сводим с прямым инвестором",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 2,
          title_ru: "Подготовка документов по евростандарту",
          title_ky: "Подготовка документов по евростандарту",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
      ],
    },
    {
      uid: 3,
      slug: "our-services",
      sectionName_ru: "Наши услуги",
      sectionName_ky: "Биздин кызматтар",
      heading_ru: "Что мы предлагаем?",
      heading_ky: "Что мы предлагаем?",
      subheading_ru:
        "У нас, как и у всех компаний есть услуги. Необходимо оплатить 1% от привлекаемой суммы, эта сумма рассчитана на проведение экономического и юридического аудита, составление бизнес-плана по евро стандартам и ТЭО. Так же после получения инвестиций необходимо оплатить 4% от привлекаемой суммы инвестиций, итого 5%.",
      subheading_ky:
        "У нас, как и у всех компаний есть услуги. Необходимо оплатить 1% от привлекаемой суммы, эта сумма рассчитана на проведение экономического и юридического аудита, составление бизнес-плана по евро стандартам и ТЭО. Так же после получения инвестиций необходимо оплатить 4% от привлекаемой суммы инвестиций, итого 5%.",
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 3,
          title_ru: "Финансовый консалтинг",
          title_ky: "Финансовый консалтинг",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          bullets_ky: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          image: null,
        },
        {
          sectionId: 3,
          title_ru: "Стратегический консалтинг",
          title_ky: "Стратегический консалтинг",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          bullets_ky: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          image: null,
        },
        {
          sectionId: 3,
          title_ru: "Маркетинговый консалтинг",
          title_ky: "Маркетинговый консалтинг",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          bullets_ky: [
            "Управление инвестициями: Разработка инвестиционных стратегий, подбор подходящих инвестиционных инструментов.",
            "Финансовый анализ и прогнозирование: Подготовка финансовых отчетов и прогнозов для потенциальных инвесторов.",
            "Оптимизация налогов и затрат: Консультации по налоговым вопросам и оптимизации затрат для повышения привлекательности бизнеса для инвесторов.",
          ],
          image: null,
        },
      ],
    },
    {
      uid: 4,
      slug: "why-us",
      sectionName_ru: "Почему мы?",
      sectionName_ky: "Эмне үчүн биз?",
      heading_ru: "Азия Консалтинг Company",
      heading_ky: "Азия Консалтинг Company",
      subheading_ru:
        "Мы - ваш надежный партнер в мире консалтинга. Наша компания предлагает высококлассные консультационные услуги для различных отраслей бизнеса. Наша команда экспертов тщательно анализирует рынок и предлагает вам индивидуальные стратегии для достижения ваших целей. Не упустите возможность улучшить свой бизнес с нами. Наша консалтинговая компания посвящена предоставлению высококачественных услуг для помощи бизнесу процветать. С нашей командой экспертов мы предлагаем индивидуальные решения, отвечающие вашим конкретным потребностям и целям. Позвольте нам провести вас к успеху на конкурентном рынке.",
      subheading_ky:
        "Мы - ваш надежный партнер в мире консалтинга. Наша компания предлагает высококлассные консультационные услуги для различных отраслей бизнеса. Наша команда экспертов тщательно анализирует рынок и предлагает вам индивидуальные стратегии для достижения ваших целей. Не упустите возможность улучшить свой бизнес с нами. Наша консалтинговая компания посвящена предоставлению высококачественных услуг для помощи бизнесу процветать. С нашей командой экспертов мы предлагаем индивидуальные решения, отвечающие вашим конкретным потребностям и целям. Позвольте нам провести вас к успеху на конкурентном рынке.",
      primaryButton_ru: "Связаться",
      primaryButton_ky: "Связаться",
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 4,
          title_ru: "Рахманов Талант Нурланович",
          title_ky: "Рахманов Талант Нурланович",
          description_ru: "Генеральный директор",
          description_ky: "Генеральный директор",
          extra_ru: "Азия Консалтинг Компани",
          extra_ky: "Азия Консалтинг Компани",
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
      ],
    },
    {
      uid: 5,
      slug: "faq",
      sectionName_ru: "Часто задаваемые вопросы",
      sectionName_ky: "Көп берилүүчү суроолор",
      heading_ru: "Как получить инвестиции всего в 4 шага?",
      heading_ky: "Как получить инвестиции всего в 4 шага?",
      subheading_ru:
        "Оставьте заявку на этом сайте, и мы свяжемся с вами для дальнейшего сотрудничества",
      subheading_ky:
        "КереОставьте заявку на этом сайте, и мы свяжемся с вами для дальнейшего сотрудничества",
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 5,
          title_ru: "Шаг 1",
          title_ky: "Шаг 1",
          description_ru:
            "Вы оставляете заявку на нашем сайте, WhatsApp, Telegram и мы ее рассматриваем",
          description_ky:
            "Вы оставляете заявку на нашем сайте, WhatsApp, Telegram и мы ее рассматриваем",
          extra_ru: "Нужно:",
          extra_ky: "Нужно:",
          bullets_ru: [
            "Кратко описать ваш проект",
            "Написать сумму инвестиций, которая вам нужна",
          ],
          bullets_ky: [
            "Кратко описать ваш проект",
            "Написать сумму инвестиций, которая вам нужна",
          ],
          image: null,
        },
        {
          sectionId: 5,
          title_ru: "Шаг 2",
          title_ky: "Шаг 2",
          description_ru:
            "Вы оставляете заявку на нашем сайте, WhatsApp, Telegram и мы ее рассматриваем",
          description_ky:
            "Вы оставляете заявку на нашем сайте, WhatsApp, Telegram и мы ее рассматриваем",
          extra_ru: "Нужно:",
          extra_ky: "Нужно:",
          bullets_ru: [
            "Кратко описать ваш проект",
            "Написать сумму инвестиций, которая вам нужна",
          ],
          bullets_ky: [
            "Кратко описать ваш проект",
            "Написать сумму инвестиций, которая вам нужна",
          ],
          image: null,
        },
      ],
    },
    {
      uid: 6,
      slug: "blog",
      sectionName_ru: "Блог",
      sectionName_ky: "Блог",
      heading_ru: "Новости нашей компании",
      heading_ky: "Новости нашей компании",
      subheading_ru:
        "В этом разделе мы делимся последними новостями в нашей компании",
      subheading_ky:
        "В этом разделе мы делимся последними новостями в нашей компании",
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [],
    },
    {
      uid: 7,
      slug: "cta",
      sectionName_ru: null,
      sectionName_ky: null,
      heading_ru:
        "СпецпредложОтправьте заявку для сотрудничестваение для стартаперов",
      heading_ky: "Отправьте заявку для сотрудничества",
      subheading_ru:
        "Оставьте заявку на этом сайте, и мы свяжемся с вами для дальнейшего сотрудничества",
      subheading_ky:
        "Оставьте заявку на этом сайте, и мы свяжемся с вами для дальнейшего сотрудничества",
      primaryButton_ru: "Отправить заявку",
      primaryButton_ky: "Отправить заявку",
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 7,
          title_ru: "Ваше сообщение",
          title_ky: "Ваше сообщение",
          description_ru:
            "Чтобы записаться на консультацию, вам нужно предоставить информацию о вашем проекте.",
          description_ky:
            "Чтобы записаться на консультацию, вам нужно предоставить информацию о вашем проекте.",
          extra_ru: "Пожалуйста опишите свой проект в одном сообщении:",
          extra_ky: "Пожалуйста опишите свой проект в одном сообщении:",
          bullets_ru: [
            "Название проекта",
            "Действующий ли у вас бизнес проект или проект на стадии идеи?",
            "Название проекта",
            "Действующий ли у вас бизнес проект или проект на стадии идеи?",
          ],
          bullets_ky: [
            "Название проекта",
            "Действующий ли у вас бизнес проект или проект на стадии идеи?",
            "Название проекта",
            "Действующий ли у вас бизнес проект или проект на стадии идеи?",
          ],
          image: null,
        },
      ],
    },
    {
      uid: 8,
      slug: "contact",
      sectionName_ru: null,
      sectionName_ky: null,
      heading_ru: "Наши контакты",
      heading_ky: "Наши контакты",
      subheading_ru: "Мы будем рады услышать вас",
      subheading_ky: "Мы будем рады услышать вас",
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 8,
          title_ru: "Электронная почта",
          title_ky: "Электронная почта",
          description_ru: "asiaconsulting@gmail.com",
          description_ky: "asiaconsulting@gmail.com",
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 8,
          title_ru: "Адрес нашего офиса",
          title_ky: "Адрес нашего офиса",
          description_ru:
            "г.Бишкек, ул. Н.Исанова “79”, БЦ 79, 6 этаж, каб. 605",
          description_ky:
            "г.Бишкек, ул. Н.Исанова “79”, БЦ 79, 6 этаж, каб. 605",
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 8,
          title_ru: "Номер телефона",
          title_ky: "Номер телефона",
          description_ru: "+996 556 50 55 05",
          description_ky: "+996 556 50 55 05",
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
      ],
    },
    {
      uid: 9,
      slug: "certificates",
      sectionName_ru: null,
      sectionName_ky: null,
      heading_ru: null,
      heading_ky: null,
      subheading_ru: null,
      subheading_ky: null,
      primaryButton_ru: null,
      primaryButton_ky: null,
      secondaryButton_ru: null,
      secondaryButton_ky: null,
      image: null,
      cards: [
        {
          sectionId: 9,
          title_ru: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          title_ky: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 9,
          title_ru: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          title_ky: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
        {
          sectionId: 9,
          title_ru: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          title_ky: "Сертификат Франко-Кыргызской бизнес ассоциации 2022 г.",
          description_ru: null,
          description_ky: null,
          extra_ru: null,
          extra_ky: null,
          bullets_ru: [],
          bullets_ky: [],
          image: null,
        },
      ],
    },
  ]

  await prisma.section.deleteMany({})

  for (const section of sections) {
    const { cards, ...rest } = section
    await prisma.section.create({
      data: rest,
    })

    if (cards.length > 0) {
      await prisma.card.createMany({
        data: cards,
      })
    }
  }

  console.log("Sections have been seeded.")
}

async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables.",
    )
  }

  await prisma.user.deleteMany({})

  await prisma.user.create({
    data: {
      name: "Admin",
      email: adminEmail,
      password: adminPassword,
      role: "ADMIN",
    },
  })

  console.log("Admin user has been seeded.")
}

async function seedSocials() {
  const socials: zSocial[] = [
    {
      type: "email",
      name: "asiaconsulting@gmail.com",
      link: "mailto:asiaconsulting@gmail.com",
      icon: null,
    },
    {
      type: "instagram",
      name: "@asiaconsulting",
      link: "https://www.instagram.com/",
      icon: null,
    },
    {
      type: "whatsapp",
      name: "+996 556 50 55 05",
      link: "https://api.whatsapp.com/send?phone=996556505505",
      icon: null,
    },
    {
      type: "telegram",
      name: "+996 556 50 55 05",
      link: "https://t.me/",
      icon: null,
    },
    {
      type: "phone",
      name: "+996 556 50 55 05",
      link: "tel:+996556505505",
      icon: null,
    },
  ]

  prisma.social.deleteMany({})

  // Socials
  await prisma.social.createMany({ data: socials })

  console.log("Socials have been seeded.")
}

async function main() {
  await seedSections()
  await seedAdminUser()
  await seedSocials()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
