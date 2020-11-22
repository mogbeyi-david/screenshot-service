FROM node:latest
WORKDIR /src
RUN npm install -g pm2
RUN pm2 install typescript
RUN npm install -g ts-node
RUN npm install
COPY ecosystem.config.js ./ecosystem.config.js
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY .env ./.env
ADD ./src/ /src/
CMD ["pm2", "start", "ecosystem.config.js"]