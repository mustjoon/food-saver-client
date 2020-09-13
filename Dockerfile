# build stage
FROM node:lts-alpine as build-stage

RUN apt-get update && apt-get install -y \
curl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8090
CMD ["nginx", "-g", "daemon off;"]