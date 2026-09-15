const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const publicHtmlDir = path.join(__dirname, 'public_html');

// 1. Ensure dist directories exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 2. Copy static files to dist root and public_html
const staticFiles = [
  'ads.txt',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'favicon.png',
  'favicon.svg',
  'apple-touch-icon.png'
];

for (const file of staticFiles) {
  const srcPublic = path.join(publicDir, file);
  if (fs.existsSync(srcPublic)) {
    fs.copyFileSync(srcPublic, path.join(distDir, file));
  }
}

// Also ensure public_html in dist
const distPublicHtml = path.join(distDir, 'public_html');
if (!fs.existsSync(distPublicHtml)) {
  fs.mkdirSync(distPublicHtml, { recursive: true });
}
if (fs.existsSync(path.join(publicHtmlDir, 'ads.txt'))) {
  fs.copyFileSync(path.join(publicHtmlDir, 'ads.txt'), path.join(distPublicHtml, 'ads.txt'));
}

// 3. Create static HTML entry points for every route to prevent 404
const routes = [
  'about',
  'terms',
  'privacy',
  'store',
  'blog',
  'contact',
  'cookies',
  'adsense-standards',
  'diagnostics'
];

const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  for (const route of routes) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtmlContent);
    // Also write route.html at dist root
    fs.writeFileSync(path.join(distDir, `${route}.html`), indexHtmlContent);
  }
  console.log(`Successfully generated static entry points for ${routes.length} routes.`);
}

console.log('Postbuild processing completed successfully.');
