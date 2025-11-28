# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Correct build command for your project
RUN npx ng build angular-15-crud --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# copy SPA build
COPY --from=build /app/dist/angular-15-crud/ /usr/share/nginx/html

# custom nginx config to enable SPA (client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
