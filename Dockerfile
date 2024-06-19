FROM node:18-alpine3.14 AS builder
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build 
FROM --platform=linux/amd64 nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html 
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
ENTRYPOINT ["nginx", "-g", "daemon off;"]



