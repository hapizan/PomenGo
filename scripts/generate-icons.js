const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, '../public/icons');
const primaryColor = '#180092'; // Primary brand color

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create SVG template for icon
function createIconSVG(size, text = 'M') {
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${primaryColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.6}" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="central"
      >${text}</text>
    </svg>
  `;
}

async function generateIcon(size, filename, text = 'M') {
  const svg = createIconSVG(size, text);
  const outputPath = path.join(iconsDir, filename);
  
  try {
    await sharp(Buffer.from(svg))
      .png()
      .resize(size, size)
      .toFile(outputPath);
    console.log(`✓ Created ${filename} (${size}x${size})`);
  } catch (error) {
    console.error(`✗ Failed to create ${filename}:`, error.message);
  }
}

async function generateAllIcons() {
  console.log('Generating PWA icons...\n');
  
  // Generate PWA icons
  await generateIcon(192, 'icon-192x192.png', 'M');
  await generateIcon(512, 'icon-512x512.png', 'M');
  
  // Generate Apple touch icon (180x180)
  await generateIcon(180, 'apple-touch-icon.png', 'M');
  
  // Generate favicon (32x32)
  await generateIcon(32, 'favicon.ico', 'M');
  
  // Also create a 16x16 favicon
  await generateIcon(16, 'favicon-16x16.png', 'M');
  
  console.log('\n✓ All PWA icons generated successfully!');
  console.log('Note: Replace these with professionally designed icons for production.');
}

generateAllIcons().catch(console.error);
