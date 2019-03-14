FROM node:8.11.3

WORKDIR /groups

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 80

ENTRYPOINT ["npm", "start"]