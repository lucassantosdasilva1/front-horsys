FROM node:18-alpine as modules-builder
WORKDIR /usr/src/modules
RUN apk add git
COPY package.json .
RUN /usr/local/bin/yarn

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=modules-builder /usr/src/modules .
COPY . .
RUN yarn build
ENTRYPOINT yarn start
