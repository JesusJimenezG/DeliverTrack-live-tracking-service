FROM node:18.15.0-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY delivertrack-middlewares-0.0.1.tgz ./
RUN npm install

# Copy
COPY . .

EXPOSE 4001
CMD [ "npm", "run", "dev" ]