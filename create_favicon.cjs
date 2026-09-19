const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function calcCrc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(len + 12);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4);
  data.copy(buf, 8);
  const crcBuf = Buffer.concat([Buffer.from(type), data]);
  const crc = calcCrc32(crcBuf);
  buf.writeUInt32BE(crc, len + 8);
  return buf;
}

// Universal PNG generator supporting any dimension and maskable styling
function createIconPNG(width, height, options = {}) {
  const isMaskable = options.maskable || false;
  const bgPadding = isMaskable ? 0.70 : 0.84; // Safe zone

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);

  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const cx = width / 2;
  const cy = height / 2;
  const r = (Math.min(width, height) / 2) * bgPadding;
  const innerR = r * 0.85;

  const rawData = [];

  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter type none
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isMaskable) {
        // Full bleed background for Android maskable icon (#0f172a)
        if (dist <= innerR) {
          const normDist = dist / innerR;
          const isMeridian = Math.abs(dx) <= width * 0.02 || Math.abs(dy) <= height * 0.02;
          const isBorder = Math.abs(dist - innerR) <= width * 0.035;

          if (isBorder || isMeridian) {
            rawData.push(56, 189, 248, 255); // #38bdf8
          } else if (normDist <= 0.25) {
            rawData.push(96, 165, 250, 255); // #60a5fa
          } else {
            rawData.push(29, 78, 216, 255); // #1d4ed8
          }
        } else {
          rawData.push(15, 23, 42, 255); // #0f172a
        }
      } else {
        // Sleek icon with modern rounded background (#0f172a)
        const cornerRadius = width * 0.22;
        const inRoundedRect = 
          x >= cx - r && x <= cx + r && y >= cy - r && y <= cy + r &&
          (Math.abs(dx) <= r - cornerRadius || Math.abs(dy) <= r - cornerRadius ||
           Math.pow(Math.abs(dx) - (r - cornerRadius), 2) + Math.pow(Math.abs(dy) - (r - cornerRadius), 2) <= cornerRadius * cornerRadius);

        if (inRoundedRect) {
          const isOuterBorder = Math.abs(dist - (r * 0.8)) <= width * 0.03;
          const isMeridian = (Math.abs(dx) <= width * 0.025 || Math.abs(dy) <= height * 0.025) && dist <= r * 0.8;
          const isCore = dist <= r * 0.28;

          if (isCore) {
            rawData.push(56, 189, 248, 255); // Electric cyan #38bdf8
          } else if (isOuterBorder || isMeridian) {
            rawData.push(96, 165, 250, 255); // Soft blue #60a5fa
          } else if (dist <= r * 0.8) {
            rawData.push(30, 58, 138, 255); // Royal blue #1e3a8a
          } else {
            rawData.push(15, 23, 42, 255); // Dark navy base #0f172a
          }
        } else {
          rawData.push(0, 0, 0, 0); // Transparent
        }
      }
    }
  }

  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(__dirname, 'public');

// 1. Generate PNGs in all required standard sizes
const png16 = createIconPNG(16, 16);
const png32 = createIconPNG(32, 32);
const png48 = createIconPNG(48, 48);   // Official Google Search minimum multiple of 48
const png96 = createIconPNG(96, 96);   // Retina Google Search multiple of 48
const png180 = createIconPNG(180, 180); // Apple touch icon
const png192 = createIconPNG(192, 192); // Android web app multiple of 48
const png512 = createIconPNG(512, 512, { maskable: true }); // PWA Splash icon

fs.writeFileSync(path.join(publicDir, 'favicon.png'), png48);
fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), png96);
fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

// 2. Build multi-image standard ICO container with 48x48 (Google standard) and 32x32
// ICO Header: 6 bytes
const numImages = 2;
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = Icon
icoHeader.writeUInt16LE(numImages, 4); // Number of images

// Directory entry 1: 48x48
const dirEntry48 = Buffer.alloc(16);
dirEntry48.writeUInt8(48, 0); // Width
dirEntry48.writeUInt8(48, 1); // Height
dirEntry48.writeUInt8(0, 2);  // Colors
dirEntry48.writeUInt8(0, 3);  // Reserved
dirEntry48.writeUInt16LE(1, 4); // Color planes
dirEntry48.writeUInt16LE(32, 6); // Bits per pixel
dirEntry48.writeUInt32LE(png48.length, 8); // Size
const offset48 = 6 + (16 * numImages);
dirEntry48.writeUInt32LE(offset48, 12); // Offset

// Directory entry 2: 32x32
const dirEntry32 = Buffer.alloc(16);
dirEntry32.writeUInt8(32, 0); // Width
dirEntry32.writeUInt8(32, 1); // Height
dirEntry32.writeUInt8(0, 2);  // Colors
dirEntry32.writeUInt8(0, 3);  // Reserved
dirEntry32.writeUInt16LE(1, 4); // Color planes
dirEntry32.writeUInt16LE(32, 6); // Bits per pixel
dirEntry32.writeUInt32LE(png32.length, 8); // Size
const offset32 = offset48 + png48.length;
dirEntry32.writeUInt32LE(offset32, 12); // Offset

const icoFile = Buffer.concat([icoHeader, dirEntry48, dirEntry32, png48, png32]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);

console.log('Successfully generated Google-compliant 48x48, 96x96, 192x192 PNGs and multi-resolution favicon.ico!');

