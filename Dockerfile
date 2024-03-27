### STAGE 1: Build ###
FROM node:18-alpine3.18 AS build
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build
### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/counter-app /usr/share/nginx/html

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs
COPY --from=build /app/dist/counter-app .