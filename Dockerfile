FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1337

CMD ["npm", "run" , "start"]