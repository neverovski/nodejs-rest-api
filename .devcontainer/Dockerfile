ARG VARIANT="18.14"

# Install dependencies only when needed
FROM node:${VARIANT} AS deps
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

RUN apt-get update
RUN apt-get install -y \
  sudo \
  lsb-release \
  curl
WORKDIR /app

COPY package*.json ./

RUN npm install

# Production image, copy all the files and run next
FROM node:${VARIANT} AS runner
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"
ARG APP_PORT
ENV APP_PORT=${APP_PORT:-5858}

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Ensure default `auth` user has access to `sudo`
ARG USERNAME=auth
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

EXPOSE ${APP_PORT}
CMD npm run start:dev
