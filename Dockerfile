# Install dependencies only when needed
FROM node:18.12-alpine3.16 AS deps
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:18.12-alpine3.16 AS builder
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"
ARG APP_ENV
ENV APP_ENV ${APP_ENV:-development}

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN APP_ENV=${APP_ENV} npm run build

# Production image, copy all the files and run next
FROM node:18.12-alpine3.16 AS runner
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"
ARG APP_PORT
ENV APP_PORT=${APP_PORT:-5858}

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:prod"]
