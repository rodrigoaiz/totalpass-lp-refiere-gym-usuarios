const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'index.html');
const cssPath = path.join(__dirname, 'public', 'styles.css');
const outputPath = path.join(__dirname, 'public', 'index.inline.html');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const inlinedHtml = html.replace(
  /<link rel="stylesheet" href="styles\.css"\s*\/?>/,
  `<style>\n${css}\n</style>`
);

fs.writeFileSync(outputPath, inlinedHtml);
console.log('✅ HTML con CSS inline generado en public/index.inline.html');
