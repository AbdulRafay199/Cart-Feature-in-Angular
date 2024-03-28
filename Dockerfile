### STAGE 1: Build ###
FROM node:18-alpine3.18 AS build
WORKDIR /dist/src/app
COPY . .
RUN npm install
RUN npm run build


## STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /dist/src/app/dist/counter-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80