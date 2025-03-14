FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN rm -rf prisma/migrations

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 3035

CMD ["npm", "start"]