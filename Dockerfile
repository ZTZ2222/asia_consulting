FROM node:20.10-alpine

RUN apk update && apk add --no-cache libc6-compat postgresql-client
WORKDIR /app

COPY package*.json ./
COPY ./prisma prisma
RUN npm ci

RUN npx prisma generate

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]