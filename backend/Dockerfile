FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN rm -rf prisma/migrations

RUN npx prisma generate

RUN npx prisma migrate deploy
RUN npx prisma db seed
EXPOSE 3035

CMD ["npm", "start"]