# Etapa de construcción (Build)
FROM node:18-alpine AS build

WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package.json package-lock.json ./

# Instala todas las dependencias
RUN npm ci

# Copia todo el código fuente del frontend
COPY . .

# Construye la aplicación de producción usando Vite
RUN npm run build

# Etapa de Producción usando Nginx
FROM nginx:alpine

# Copiamos la compilación de Vite a la ruta que lee Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Agregar configuración personalizada de Nginx para manejar rutas de React (SPA fallback)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $$uri $$uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 del contenedor
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
