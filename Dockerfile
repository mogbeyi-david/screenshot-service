FROM node

WORKDIR /usr/app
COPY package*.json ./

RUN npm install -g pm2
RUN npm install -g typescript
RUN pm2 install typescript
RUN npm install

# Bundle app source
COPY . .

# for typescript
RUN npm run build
COPY .env ./dist/
COPY ecosystem.config.js ./dist/
WORKDIR ./dist

EXPOSE 3003
CMD ["node", "index.js", "&", "node", "consumers/index.js"]