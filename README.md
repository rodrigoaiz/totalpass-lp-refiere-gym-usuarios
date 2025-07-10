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
├── public/                 # Archivos públicos
│   ├── index.html         # Página principal
│   ├── form.html          # Página de formulario
│   ├── styles.css         # CSS compilado
│   └── img/               # Imágenes y logos
├── src/                   # Archivos fuente
│   ├── input.css          # CSS fuente (Tailwind)
│   └── input-back.css     # CSS adicional
├── Dockerfile             # Configuración Docker
├── sitio.conf            # Configuración Apache
├── package.json          # Dependencias Node.js
├── postcss.config.mjs    # Configuración PostCSS
└── README.md             # Este archivo
```

## 🔄 Despliegue en servidor

### Script de despliegue automático

Crea un archivo `deploy.sh` en tu servidor:

```bash
#!/bin/bash
echo "🔄 Actualizando código..."
git pull origin main

echo "🛑 Parando container..."
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

Dar permisos y ejecutar:
```bash
chmod +x deploy.sh
./deploy.sh
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

- **Cambios en código**: Después de hacer `git pull`, siempre reconstruye el contenedor Docker
- **Firewall**: Asegúrate de que el puerto 4323 esté abierto en tu servidor
- **CSS**: Los cambios en `src/input.css` requieren compilación con `npm run build`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
