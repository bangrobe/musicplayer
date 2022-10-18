# vue.js environment
FROM node:16-alpine as vue-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

#Copy certificate to /etc/ssl
COPY ./certificates /etc/ssl
COPY --from=vue-build /app/dist /usr/share/nginx/html
ENV PORT 80
ENV HOST 0.0.0.0
EXPOSE 80
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"