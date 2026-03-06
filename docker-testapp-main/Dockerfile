FROM node:24-alpine

WORKDIR /app

# copy package.json first
COPY package*.json ./

# now install dependencies
RUN npm install

# copy rest of the project
COPY . .

EXPOSE 5050

CMD ["node", "server.js"]