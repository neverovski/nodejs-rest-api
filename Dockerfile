FROM node:14
LABEL Dmitry Neverovski <dmitryneverovski@gmail.com>

# Install app dependencies
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Bundle app source
WORKDIR /app
COPY . /app
RUN npm run build

EXPOSE 5858
CMD ["npm", "run", "start:prod"]
