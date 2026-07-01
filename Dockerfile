# ==========================================
# Etapa 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar pnpm globalmente para poder gestionar las dependencias
RUN npm install -g pnpm

# Copiar archivos de configuración de dependencias primero para aprovechar el caché de capas de Docker
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instalar dependencias del proyecto de forma limpia
# --frozen-lockfile garantiza que no se modifique el archivo lock durante la compilación
RUN pnpm install --frozen-lockfile

# Copiar el resto del código del proyecto
COPY . .

# Compilar la aplicación React + Vite + TypeScript para producción
# Esto genera los archivos optimizados (HTML, JS, CSS) en la carpeta /app/dist
RUN pnpm build

# ==========================================
# Etapa 2: Servidor de Producción (Runner)
# ==========================================
FROM nginx:alpine AS runner

# Copiar los archivos estáticos generados desde la etapa de construcción al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx para soportar Single Page Applications (SPA) redireccionando todas las rutas a index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 del contenedor
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
