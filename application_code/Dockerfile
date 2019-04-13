FROM node:11

ENV NODE_ENV=PRODUCTION

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]