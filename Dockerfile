FROM node:12.16.2-buster

WORKDIR /home/node/app

ENV DB_CONNECT_URI=$DB_CONNECT_URI
ENV TOKEN_SECRET=$TOKEN_SECRET

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6767

CMD ["npm", "run", "start"]