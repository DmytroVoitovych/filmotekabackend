FROM node:18.13.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE  3006

CMD [ "node", "server"]

