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
  const bgPadding = isMaskable ? 0.70 : 0.82; // Safe zone for Android icons

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
          // Central globe
          const normDist = dist / innerR;
          const isMeridian = Math.abs(dx) <= width * 0.02 || Math.abs(dy) <= height * 0.02;
          const isBorder = Math.abs(dist - innerR) <= width * 0.035;

          if (isBorder || isMeridian) {
            // Bright electric cyan (#38bdf8)
            rawData.push(56, 189, 248, 255);
          } else if (normDist <= 0.25) {
            // Radiant center core (#60a5fa)
            rawData.push(96, 165, 250, 255);
          } else {
            // Tech royal blue (#1d4ed8)
            rawData.push(29, 78, 216, 255);
          }
        } else {
          // Sleek dark navy container (#0f172a)
          rawData.push(15, 23, 42, 255);
        }
      } else {
        // Standard Icon with transparent background
        if (dist <= r) {
          const isOuterBorder = Math.abs(dist - r) <= width * 0.035;
          const isMeridian = Math.abs(dx) <= width * 0.02 || Math.abs(dy) <= height * 0.02;

          if (isOuterBorder || isMeridian) {
            rawData.push(56, 189, 248, 255); // #38bdf8
          } else if (dist <= r * 0.25) {
            rawData.push(96, 165, 250, 255); // #60a5fa
          } else {
            // Sleek translucent navy circle (#0f172a)
            rawData.push(15, 23, 42, 250);
          }
        } else {
          // Transparent
          rawData.push(0, 0, 0, 0);
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

// 1. Generate 32x32 Favicon PNG
const png32 = createIconPNG(32, 32);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), png32);

// 2. Generate Apple Touch Icon (180x180)
const appleIcon = createIconPNG(180, 180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// 3. Generate standard .ICO container with 32x32 image
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = Icon
icoHeader.writeUInt16LE(1, 4); // 1 Image

const icoDirEntry = Buffer.alloc(16);
icoDirEntry.writeUInt8(32, 0); // Width 32
icoDirEntry.writeUInt8(32, 1); // Height 32
icoDirEntry.writeUInt8(0, 2);  // Colors
icoDirEntry.writeUInt8(0, 3);  // Reserved
icoDirEntry.writeUInt16LE(1, 4); // Color planes
icoDirEntry.writeUInt16LE(32, 6); // Bits per pixel
icoDirEntry.writeUInt32LE(png32.length, 8); // Image size in bytes
icoDirEntry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

const icoFile = Buffer.concat([icoHeader, icoDirEntry, png32]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);

console.log('Successfully generated public/favicon.ico, favicon.png, and apple-touch-icon.png');

