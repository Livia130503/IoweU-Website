# Verwendet ein Node.js-Image, um die Anwendung zu bauen
FROM node:23-alpine AS build

WORKDIR /app

# Kopiert die package.json und package-lock.json und installiert Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiert den Rest des Projekts
COPY . .

# Baue die Anwendung
ENV PATH="./node_modules/.bin:$PATH"
RUN ls -l node_modules/.bin && node_modules/.bin/vite --version
RUN npm run build

# Verwendet ein Nginx-Image, um die Anwendung bereitzustellen
FROM nginx:alpine

# Kopiert die gebauten Dateien in den Nginx-Ordner
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]