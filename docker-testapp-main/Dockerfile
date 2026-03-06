# use official Node image as the base image
FROM node:24-alpine

# set the working directory in the container
WORKDIR /app

# install dependencies
RUN npm install

# copy the whole project into the container
COPY . .

# expose the port that the app will run on
EXPOSE 5050

# start the application
CMD ["node", "server.js"]
