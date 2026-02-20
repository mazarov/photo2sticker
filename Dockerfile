# Next.js лендинг (standalone). Раньше здесь был Vite + nginx — сейчас прод на Next.js (SEO, API, кластерные страницы).
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run next:build

# Standalone не включает public и .next/static — копируем вручную
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

# Production
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
