# TotalPass - Landing Page Refiere Gimnasios

Landing page para la campaña de referidos de gimnasios, estudios y spas de TotalPass. Esta página permite a los propietarios de gimnasios registrarse para formar parte de la red de aliados de TotalPass.

## 📋 Descripción

Esta es una landing page desarrollada con HTML, CSS (Tailwind CSS) y configurada para ejecutarse en un contenedor Docker con Apache. La página incluye:

- Formulario de registro para propietarios de gimnasios
- Información sobre los beneficios de ser aliado TotalPass
- Casos de éxito de gimnasios aliados
- Diseño responsive y moderno

## 🛠️ Tecnologías

- **HTML5** - Estructura de la página
- **Tailwind CSS** - Framework de CSS para estilos
- **PostCSS** - Procesador de CSS
- **Apache** - Servidor web
- **Docker** - Contenedorización

## 📦 Instalación

### Requisitos previos
- Node.js (versión 14 o superior)
- Docker
- Git

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd totalpass-lp-refiere-gym-usuarios
```

### 2. Instalar dependencias
```bash
npm install
```

## 🚀 Scripts disponibles

### Desarrollo local

```bash
# Build completo para producción (compila CSS + genera dist/)
npm run build

# Solo compilar CSS una sola vez
npm run build:css

# Modo desarrollo con auto-compilación y servidor local
npm run dev

# Solo compilar CSS en modo watch (sin servidor)
npm run watch:css

# Generar versión inline optimizada en dist/
npm run inline

# Limpiar archivos generados (dist/ y archivos temporales)
npm run clean
```

### Build de producción

El comando `npm run build` genera una versión optimizada para producción en la carpeta `dist/` que incluye:

- **HTML optimizado**: Con CSS y JavaScript inline (sin requests externos)
- **Assets copiados**: Todas las imágenes y recursos necesarios
- **Tamaño optimizado**: Archivo único listo para deploy
- **Sin dependencias**: No requiere servidor para CSS/JS externos

```bash
# Ejemplo de uso completo
npm run clean     # Limpiar archivos previos
npm run build     # Generar build de producción
# El resultado estará en dist/index.html (listo para deploy)
```

### Desarrollo con Docker

```bash
# IMPORTANTE: Generar build antes de crear la imagen Docker
npm run build

# Construir la imagen Docker
docker build -t totalpass-lp .

# Ejecutar el contenedor
docker run -d -p 4323:4323 --name totalpass-lp-container totalpass-lp

# Ver logs del contenedor
docker logs totalpass-lp-container

# Parar y eliminar contenedor
docker stop totalpass-lp-container
docker rm totalpass-lp-container
```

### Docker con Multi-stage Build (Recomendado)

Para un build más robusto que incluye el proceso de compilación dentro del contenedor:

```bash
# Usar el Dockerfile multi-stage (no requiere npm run build previo)
docker build -f Dockerfile.multistage -t totalpass-lp .

# Ejecutar el contenedor
docker run -d -p 4323:4323 --name totalpass-lp-container totalpass-lp
```

## 🖥️ Uso

### Desarrollo local
1. Ejecuta `npm run dev` para iniciar el servidor de desarrollo
2. Abre tu navegador en `http://localhost:4323`
3. Los cambios en CSS se compilarán automáticamente

### Producción con Docker
1. Construye la imagen: `docker build -t totalpass-lp .`
2. Ejecuta el contenedor: `docker run -d -p 4323:4323 --name totalpass-lp-container totalpass-lp`
3. Accede a `http://tu-servidor:4323`

## 📁 Estructura del proyecto

```
totalpass-lp-refiere-gym-usuarios/
├── public/                 # Archivos de desarrollo
│   ├── index.html         # Página principal (desarrollo)
│   ├── form.html          # Página de formulario
│   ├── styles.css         # CSS compilado (generado)
│   └── img/               # Imágenes y logos
├── dist/                  # Build de producción (generado)
│   ├── index.html         # HTML optimizado con recursos inline
│   └── img/               # Imágenes copiadas para producción
├── src/                   # Archivos fuente
│   ├── input.css          # CSS fuente (Tailwind)
│   └── input-back.css     # CSS adicional
├── inline.js              # Script de build y optimización
├── Dockerfile             # Configuración Docker (usa dist/)
├── Dockerfile.multistage  # Build multi-etapa (recomendado)
├── deploy.sh              # Script de despliegue automático
├── sitio.conf            # Configuración Apache
├── package.json          # Dependencias Node.js
├── postcss.config.mjs    # Configuración PostCSS
└── README.md             # Este archivo
```

### Carpetas importantes:

- **`src/`**: Código fuente (CSS con Tailwind)
- **`public/`**: Archivos para desarrollo local
- **`dist/`**: Build optimizado para producción (generado automáticamente)
  - Contiene HTML con CSS/JS inline
  - Incluye todas las imágenes necesarias
  - Listo para deploy sin dependencias externas

## 🔄 Despliegue en servidor

### Script de despliegue automático

El archivo `deploy.sh` incluye el proceso completo de build y despliegue:

```bash
#!/bin/bash
echo "🔄 Actualizando código..."
git pull origin main

echo "� Instalando dependencias..."
npm install

echo "🏗️ Generando build de producción..."
npm run build

echo "�🛑 Parando container..."
docker stop totalpass-lp-container 2>/dev/null || true

echo "🗑️ Eliminando container..."
docker rm totalpass-lp-container 2>/dev/null || true

echo "🔨 Reconstruyendo imagen..."
docker build -t totalpass-lp .

echo "🚀 Ejecutando nuevo container..."
docker run -d -p 4323:4323 --name totalpass-lp-container totalpass-lp

echo "✅ Despliegue completado!"
docker ps | grep totalpass-lp
```

### Uso del script de deploy

```bash
# Dar permisos de ejecución (solo la primera vez)
chmod +x deploy.sh

# Ejecutar despliegue
./deploy.sh
```

### Deploy alternativo con Multi-stage

Si prefieres que el build se haga dentro del contenedor:

```bash
#!/bin/bash
echo "🔄 Actualizando código..."
git pull origin main

echo "🛑 Parando container..."
docker stop totalpass-lp-container 2>/dev/null || true
docker rm totalpass-lp-container 2>/dev/null || true

echo "🔨 Build con multi-stage..."
docker build -f Dockerfile.multistage -t totalpass-lp .

echo "🚀 Ejecutando nuevo container..."
docker run -d -p 4323:4323 --name totalpass-lp-container totalpass-lp

echo "✅ Despliegue completado!"
```

## 🔧 Configuración

### Puerto
El proyecto está configurado para ejecutarse en el puerto **4323**. Para cambiar el puerto:

1. Modifica `package.json` (script dev)
2. Modifica `Dockerfile` (líneas Listen y EXPOSE)
3. Modifica `sitio.conf` (VirtualHost)

### Formulario
El formulario está configurado para enviar datos a Salesforce. Para configurarlo:

1. Edita los valores `oid` y `retURL` en los formularios HTML
2. Ajusta los nombres de los campos según tu configuración de Salesforce

## 📝 Notas importantes

### Build y Deploy
- **Build requerido**: Siempre ejecuta `npm run build` antes de crear la imagen Docker
- **Carpeta dist**: El Dockerfile usa `dist/` que contiene la versión optimizada
- **Assets incluidos**: El build copia automáticamente todas las imágenes necesarias
- **Archivo único**: El HTML final incluye todo el CSS y JS inline (sin requests externos)

### Desarrollo vs Producción
- **Desarrollo**: Usa `npm run dev` con la carpeta `public/`
- **Producción**: Usa `npm run build` para generar `dist/` optimizado
- **Docker**: Siempre usa el contenido de `dist/` para máximo rendimiento

### Servidor
- **Firewall**: Asegúrate de que el puerto 4323 esté abierto
- **Updates**: Después de `git pull`, ejecuta el script `deploy.sh` completo
- **CSS**: Los cambios en `src/input.css` requieren `npm run build`

### Archivos generados
Los siguientes archivos/carpetas se generan automáticamente y están en `.gitignore`:
- `dist/` - Build de producción
- `public/styles.css` - CSS compilado para desarrollo
- `public/index.inline.html` - Versión inline temporal

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
