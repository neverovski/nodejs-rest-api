# Install dependencies only when needed
FROM node:18-alpine AS deps
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>
ARG APP_ENV
ENV APP_ENV ${APP_ENV:-development}

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN APP_ENV=${APP_ENV} npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>
ARG RUNTIME
ENV RUNTIME ${RUNTIME:-dev}

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5858
CMD npm run start:${RUNTIME}
