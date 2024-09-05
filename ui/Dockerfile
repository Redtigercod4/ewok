# Build Application
FROM node:alpine AS BUILD

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY ./ ./

RUN npm run build

# Serve Application via NGINX
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILD /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]