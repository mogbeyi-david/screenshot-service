FROM node:12.13.0-alpine

WORKDIR /usr/app
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g concurrently
RUN npm install

COPY . .


EXPOSE 3000
CMD ["npm", "start"]