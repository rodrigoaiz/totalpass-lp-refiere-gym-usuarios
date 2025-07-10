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
