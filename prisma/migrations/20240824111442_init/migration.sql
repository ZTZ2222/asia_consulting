-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "UserRoleInChat" AS ENUM ('CUSTOMER', 'SUPPORT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateTable
CREATE TABLE "articles" (
    "uid" SERIAL NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_ky" TEXT,
    "content_ru" TEXT NOT NULL,
    "content_ky" TEXT,
    "image" TEXT NOT NULL,
    "linkTitle_ru" TEXT,
    "linkTitle_ky" TEXT,
    "linkHref" TEXT,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "article_socials" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "article_socials_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "chats" (
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sender" "UserRoleInChat" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "uid" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "sectionName_ru" TEXT,
    "sectionName_ky" TEXT,
    "heading_ru" TEXT,
    "heading_ky" TEXT,
    "subheading_ru" TEXT,
    "subheading_ky" TEXT,
    "primaryButton_ru" TEXT,
    "primaryButton_ky" TEXT,
    "secondaryButton_ru" TEXT,
    "secondaryButton_ky" TEXT,
    "image" TEXT,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "cards" (
    "uid" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title_ru" TEXT,
    "title_ky" TEXT,
    "description_ru" TEXT,
    "description_ky" TEXT,
    "extra_ru" TEXT,
    "extra_ky" TEXT,
    "bullets_ru" TEXT[],
    "bullets_ky" TEXT[],
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "socials" (
    "uid" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "meta_datas" (
    "uid" SERIAL NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_ky" TEXT,
    "description_ru" TEXT NOT NULL,
    "description_ky" TEXT,
    "keywords_ru" TEXT NOT NULL,
    "keywords_ky" TEXT,
    "ogImage" TEXT,
    "logo1" TEXT,
    "logo2" TEXT,

    CONSTRAINT "meta_datas_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "client_requests" (
    "uid" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "accepted_privacy_policy" BOOLEAN NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_requests_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sections_slug_key" ON "sections"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cards_sectionId_uid_key" ON "cards"("sectionId", "uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "article_socials" ADD CONSTRAINT "article_socials_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
