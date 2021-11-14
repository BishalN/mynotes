FROM node:latest

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build
RUN yarn prisma generate

ENV NODE_ENV production

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
USER node