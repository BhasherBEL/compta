FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM busybox:stable

WORKDIR /www

COPY --from=builder /usr/src/app/public/ .

EXPOSE 8080

CMD ["busybox", "httpd", "-p", "0.0.0.0:8080", "-f", "-v", "-h", "/www"]
