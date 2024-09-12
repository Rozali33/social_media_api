FROM node:20.11.0

WORKDIR /backend

COPY . .

RUN npm install
RUN npm i bcrypt

CMD ["node", "index.js"]