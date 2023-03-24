FROM node:18.15.0-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY session-authentication-middleware-1.0.0.tgz ./
RUN npm install

# Copy
COPY . .

EXPOSE 4001
CMD [ "npm", "run", "dev" ]