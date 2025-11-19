/**
 * Script para gerar ícones PWA a partir do favicon.png
 * Execute: node scripts/generate-pwa-icons.js
 *
 * Requisitos: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputPath = path.join(__dirname, '../public/favicon.png');
const outputDir = path.join(__dirname, '../public/pwa-icons');

// Criar diretório se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Gerando ícones PWA...\n');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);

    console.log(`✓ icon-${size}x${size}.png`);
  }

  // Gerar ícone maskable (com padding para safe zone)
  const maskableSize = 512;
  const maskablePath = path.join(outputDir, `maskable-icon-${maskableSize}x${maskableSize}.png`);

  // Para maskable, o ícone deve ocupar ~80% do espaço (safe zone)
  const iconSize = Math.floor(maskableSize * 0.8);
  const padding = Math.floor((maskableSize - iconSize) / 2);

  await sharp(inputPath)
    .resize(iconSize, iconSize, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: '#FF6B35' // Cor primária da marca
    })
    .png()
    .toFile(maskablePath);

  console.log(`✓ maskable-icon-${maskableSize}x${maskableSize}.png`);

  console.log('\n✅ Todos os ícones foram gerados em public/pwa-icons/');
}

generateIcons().catch(console.error);
