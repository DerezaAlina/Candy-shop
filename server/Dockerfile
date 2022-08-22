FROM node:17.8.0

WORKDIR /server

COPY ./package.json ./

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD npm run dev