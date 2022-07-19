FROM nikolaik/python-nodejs:python3.10-nodejs16 as production-stage

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
COPY . .

ENTRYPOINT sh ./healthcheck.sh && sh ./entrypoint.sh