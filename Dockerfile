FROM node:13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production=false

# Copying source files
COPY . /usr/src/app

# Building app
RUN yarn build

