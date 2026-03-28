# Etapa Base
FROM node:18-alpine AS base

WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala todas las dependencias (incluidas las de desarrollo para el build)
RUN npm install

# Copia todo el código fuente del backend
COPY . .

# Genera el build (compila con babel de src/ a dist/)
RUN npm run build

# Etapa de Producción
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instala SÓLO dependencias de producción
RUN npm install --only=production

# Copia la versión compilada desde la etapa anterior
COPY --from=base /app/dist ./dist

# Si usas variables de entorno internas como plantillas u otros asstes
# debes copiarlos aquí, ej: COPY public ./public

# Expone el puerto que corre el servidor (asumiendo 3000 o 8081)
EXPOSE 8081

# Ejecuta el archivo transpilado
CMD ["npm", "run", "build:app"]
