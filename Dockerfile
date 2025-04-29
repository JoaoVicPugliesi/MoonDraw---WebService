ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

USER node

EXPOSE 8000

CMD ["npm", "run", "dev"]
