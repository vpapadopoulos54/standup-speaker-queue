import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Copy manifest.json
const manifestSrc = path.join(projectRoot, 'public', 'manifest.json');
const manifestDest = path.join(projectRoot, 'dist', 'manifest.json');

fs.copyFileSync(manifestSrc, manifestDest);
console.log('✓ Copied manifest.json to dist/');

// Find the actual built JS file
const assetsDir = path.join(projectRoot, 'dist', 'assets');
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.startsWith('index-') && f.endsWith('.css'));

if (jsFiles.length > 0) {
  const jsFile = jsFiles[0];
  const cssFile = cssFiles.length > 0 ? cssFiles[0] : null;

  // Read popup.html and inject the correct file references
  let popupHtml = fs.readFileSync(path.join(projectRoot, 'dist', 'popup.html'), 'utf-8');

  // Replace the script src with the actual built file
  popupHtml = popupHtml.replace(
    /src="assets\/main\.js"/,
    `src="assets/${jsFile}"`
  );

  // Add CSS link if it exists
  if (cssFile) {
    const cssLink = `    <link rel="stylesheet" crossorigin href="assets/${cssFile}">\n`;
    popupHtml = popupHtml.replace('  </head>', `${cssLink}  </head>`);
  }

  fs.writeFileSync(path.join(projectRoot, 'dist', 'popup.html'), popupHtml);
  console.log(`✓ Updated popup.html to reference ${jsFile}`);
}

// Create icons directory
const iconsDir = path.join(projectRoot, 'dist', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create placeholder icons
const createPlaceholderIcon = (size) => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#grad)"/>
    <text x="${size/2}" y="${size/2}" font-size="${size/2}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">Q</text>
  </svg>`;

  return svg;
};

fs.writeFileSync(path.join(iconsDir, 'icon-16.svg'), createPlaceholderIcon(16));
fs.writeFileSync(path.join(iconsDir, 'icon-48.svg'), createPlaceholderIcon(48));
fs.writeFileSync(path.join(iconsDir, 'icon-128.svg'), createPlaceholderIcon(128));

console.log('✓ Created extension icons');
console.log('✓ Extension is ready to load!');
