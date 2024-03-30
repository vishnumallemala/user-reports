FROM node:18-alpine

WORKDIR /usr/src/user-report
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 2000

CMD ["npm", "start"]