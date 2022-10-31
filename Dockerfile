# vue.js environment
FROM node:16-alpine as vue-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
# server environment
FROM nginx:latest
COPY --from=vue-build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]