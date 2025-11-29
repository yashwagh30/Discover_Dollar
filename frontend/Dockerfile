# Stage 1: Build Angular App
FROM node:18-alpine AS build

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install -g @angular/cli@15
RUN npm install

# Copy all project files
COPY . .

# Build Angular app
RUN ng build --configuration production

# Stage 2: Nginx Serve
FROM nginx:alpine

# Clean default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build files to Nginx
COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
