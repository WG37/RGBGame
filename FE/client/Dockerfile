# build docker
FROM node:18-alpine AS build
WORKDIR /app
# copy package files and install deps
COPY package.json package-lock.json ./
RUN npm ci
# copy source and build
COPY . .
RUN npm run build

# docker runtime
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]