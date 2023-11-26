FROM node:21.2-alpine3.17 as build
WORKDIR /frontend
COPY ./package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.25.3-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /frontend/dist /var/www/html/
EXPOSE 80