const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a valid 32x32 PNG file with a nice globe/shield icon
function createPNG32() {
  const width = 32;
  const height = 32;
  
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // color type 6 (RGBA)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  
  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(len + 12);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    // Simple CRC32
    const crcBuf = Buffer.concat([Buffer.from(type), data]);
    const crc = calcCrc32(crcBuf);
    buf.writeUInt32BE(crc, len + 8);
    return buf;
  }
  
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
  
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  
  // Scanlines
  const rawData = [];
  const cx = 16, cy = 16, r = 13;
  
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter type none
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const distSq = dx * dx + dy * dy;
      
      if (distSq <= r * r) {
        // Inside globe
        if (Math.abs(dx) <= 1 || Math.abs(dy) <= 1 || Math.abs(distSq - r * r) <= 12) {
          // Grid lines or border: bright cyan / blue
          rawData.push(56, 189, 248, 255); // #38bdf8
        } else if (distSq <= 16) {
          // Center core
          rawData.push(96, 165, 250, 255); // #60a5fa
        } else {
          // Deep tech blue
          rawData.push(15, 23, 42, 240); // dark slate blue
        }
      } else {
        // Transparent outside
        rawData.push(0, 0, 0, 0);
      }
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createPNG32();

// 1. Save PNG favicon and apple touch icon
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.png'), pngBuffer);
fs.writeFileSync(path.join(__dirname, 'public', 'apple-touch-icon.png'), pngBuffer);

// 2. Wrap PNG into valid standard .ICO format
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
icoDirEntry.writeUInt32LE(pngBuffer.length, 8); // Image size in bytes
icoDirEntry.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

const icoFile = Buffer.concat([icoHeader, icoDirEntry, pngBuffer]);
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), icoFile);

console.log('Successfully generated public/favicon.ico, favicon.png, and apple-touch-icon.png');
