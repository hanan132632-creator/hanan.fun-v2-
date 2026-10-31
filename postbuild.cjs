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
  'sitemap.txt',
  'favicon.ico',
  'favicon.png',
  'favicon-48x48.png',
  'favicon-96x96.png',
  'favicon-192x192.png',
  'favicon.svg',
  'apple-touch-icon.png',
  '404.html'
];

for (const file of staticFiles) {
  const srcPublic = path.join(publicDir, file);
  if (fs.existsSync(srcPublic)) {
    fs.copyFileSync(srcPublic, path.join(distDir, file));
  }
}

// Copy sitemap.xml to dist/sitemap and dist/sitemap_index.xml as fallback
const sitemapSrc = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapSrc)) {
  fs.copyFileSync(sitemapSrc, path.join(distDir, 'sitemap'));
  fs.copyFileSync(sitemapSrc, path.join(distDir, 'sitemap_index.xml'));
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
const blogPostsFile = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
let blogRoutes = [];
if (fs.existsSync(blogPostsFile)) {
  const blogContent = fs.readFileSync(blogPostsFile, 'utf8');
  const slugMatches = [...blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => 'blog/' + m[1]);
  blogRoutes = slugMatches;
}

const staticCoreRoutes = [
  'store',
  'services',
  'about',
  'terms',
  'terms-of-service',
  'privacy',
  'privacy-policy',
  'blog',
  'contact',
  'cookies',
  'cookie-policy',
  'adsense-standards',
  'sitemap-checker',
  'vercel',
  'diagnostics',
  'audio-to-video',
  // Arabic aliases
  'عن',
  'من-نحن',
  'خدمات',
  'متجر',
  'مدونة',
  'اتصل-بنا',
  'تواصل',
  'شروط',
  'شروط-الاستخدام',
  'خصوصية',
  'سياسة-الخصوصية',
  'كوكيز',
  'ملفات-تعريف-الارتباط'
];

const routes = Array.from(new Set([...staticCoreRoutes, ...blogRoutes]));

const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  for (const route of routes) {
    try {
      const routeDir = path.join(distDir, route);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtmlContent);
      // Also write encoded version if contains non-ASCII characters
      if (/[\u0600-\u06FF]/.test(route)) {
        const encodedRoute = encodeURIComponent(route);
        const encodedDir = path.join(distDir, encodedRoute);
        if (!fs.existsSync(encodedDir)) {
          fs.mkdirSync(encodedDir, { recursive: true });
        }
        fs.writeFileSync(path.join(encodedDir, 'index.html'), indexHtmlContent);
      }
    } catch (e) {
      console.warn(`Could not generate static entry for ${route}:`, e.message);
    }
  }
  console.log(`Successfully generated static entry points for ${routes.length} routes.`);
}

console.log('Postbuild processing completed successfully.');
