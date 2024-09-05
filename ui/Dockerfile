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

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]