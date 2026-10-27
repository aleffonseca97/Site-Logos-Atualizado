# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-bookworm-slim

FROM node:${NODE_VERSION} AS deps
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
COPY prisma ./prisma
ENV DATABASE_URL="file:/tmp/build.db"
RUN npm ci

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/tmp/build.db"
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_WHATSAPP=393283634905
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP
RUN npm run build \
  && NODE_ENV=production npm prune --omit=dev \
  && mkdir -p /opt/prisma-cli \
  && cd /opt/prisma-cli \
  && npm init -y \
  && npm install prisma@6.19.0 \
  && cd /app \
  && /opt/prisma-cli/node_modules/.bin/prisma generate \
  && rm -rf .next/cache

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL="file:/data/logos.db"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /opt/prisma-cli /opt/prisma-cli
COPY --from=builder /app/prisma/dev.db /opt/seed/logos.db
COPY --from=builder /app/public/uploads /opt/seed/uploads
COPY docker/entrypoint.sh /entrypoint.sh

RUN sed -i 's/\r$//' /entrypoint.sh \
  && chmod +x /entrypoint.sh \
  && mkdir -p /data /app/public/uploads /app/.next/cache \
  && chown -R node:node /app /data /opt/seed

USER node
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
