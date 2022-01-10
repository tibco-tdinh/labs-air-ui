# Stage 1
FROM node:16-alpine3.13 as build-step

RUN apk update && \
    apk add --no-cache git && \
    mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.21.0-alpine

COPY --from=build-step /app/dist/ProjectAir /usr/share/nginx/html