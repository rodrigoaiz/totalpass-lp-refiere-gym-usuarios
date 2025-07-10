const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'index.html');
const cssPath = path.join(__dirname, 'public', 'styles.css');
const distDir = path.join(__dirname, 'dist');
const outputPath = path.join(distDir, 'index.html');

console.log('🔄 Iniciando proceso de build...');

// Crear carpeta dist si no existe
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('🗑️  Carpeta dist existente eliminada');
}
fs.mkdirSync(distDir, { recursive: true });
console.log('📁 Carpeta dist creada');

let html = fs.readFileSync(htmlPath, 'utf8');

// Inline CSS
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  html = html.replace(
    /<link rel="stylesheet" href="styles\.css"\s*\/?>/g,
    `<style>\n${css}\n</style>`
  );
  console.log('✅ CSS inlineado correctamente');
} else {
  console.log('⚠️  Archivo styles.css no encontrado');
}

// Inline JavaScript files (buscar scripts externos)
const scriptRegex = /<script\s+src="([^"]+)"\s*><\/script>/g;
let match;
let scriptCount = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  const scriptSrc = match[1];
  const scriptPath = path.join(__dirname, 'public', scriptSrc);

  if (fs.existsSync(scriptPath)) {
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    html = html.replace(
      new RegExp(`<script\\s+src="${scriptSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*></script>`, 'g'),
      `<script>\n${scriptContent}\n</script>`
    );
    scriptCount++;
    console.log(`✅ Script ${scriptSrc} inlineado correctamente`);
  } else {
    console.log(`⚠️  Script ${scriptSrc} no encontrado en el directorio público`);
  }
}

if (scriptCount === 0) {
  console.log('ℹ️  No se encontraron scripts externos para inlinear');
}

// Función para copiar archivos recursivamente
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copiar assets (imágenes, iconos, etc.)
const publicAssetsDir = path.join(__dirname, 'public');
const distAssetsDir = distDir;

// Copiar directorio img completo
const imgSrcDir = path.join(publicAssetsDir, 'img');
const imgDestDir = path.join(distAssetsDir, 'img');
if (fs.existsSync(imgSrcDir)) {
  copyDir(imgSrcDir, imgDestDir);
  console.log('🖼️  Imágenes copiadas a dist/img');
}

// Copiar otros archivos que puedan existir (favicon, etc.)
const otherFiles = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'manifest.json'];
otherFiles.forEach(file => {
  const srcFile = path.join(publicAssetsDir, file);
  const destFile = path.join(distAssetsDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`📄 ${file} copiado`);
  }
});

fs.writeFileSync(outputPath, html);

// Mostrar información del archivo generado
const stats = fs.statSync(outputPath);
const fileSizeKB = (stats.size / 1024).toFixed(2);

console.log('🎉 Build completado en la carpeta dist/');
console.log(`📁 Archivo principal: ${outputPath}`);
console.log(`📊 Tamaño del archivo: ${fileSizeKB} KB`);
console.log('🚀 Listo para deploy!');
