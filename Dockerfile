FROM node:20.18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json \
    && npm cache clean --force \
    && npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:1.25.5-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/animalia-proyec/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
