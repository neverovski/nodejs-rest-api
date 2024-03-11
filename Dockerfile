# Step 1 - Install dependencies
FROM node:20-alpine3.17 AS deps
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

USER node

# Step 2 - Build the source code
FROM node:20-alpine3.17 AS build
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-development}

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN NODE_ENV=${NODE_ENV} npm run build:api

USER node

# Step 3 - Instal dependencies without devDependencies
FROM node:20-alpine3.17 AS modules
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-development}

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev --ignore-scripts

USER node

# Step - 5 Production image, copy all the files and run next
FROM node:20-alpine3.17 AS runner
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

ARG APP_PORT
ENV APP_PORT=${APP_PORT:-5656}

COPY --chown=node:node package*.json ./
COPY --chown=node:node templates ./templates
COPY --chown=node:node --from=modules /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE ${APP_PORT}

CMD [ "node", "dist/main.js" ]
