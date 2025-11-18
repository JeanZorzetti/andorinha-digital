/**
 * Script para converter imagens OG de SVG para PNG
 *
 * Pré-requisitos:
 * npm install sharp
 *
 * Uso:
 * node scripts/convert-og-images.js
 *
 * Nota: Este script converte os arquivos SVG em public/og/ para PNG (1200x630px)
 * Os arquivos PNG são otimizados para compartilhamento em redes sociais.
 */

const fs = require('fs');
const path = require('path');

// Verifica se sharp está disponível
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp não está instalado. Instalando...');
  console.log('Execute: npm install sharp');
  console.log('');
  console.log('Após instalar, execute este script novamente.');
  process.exit(1);
}

const ogDir = path.join(__dirname, '..', 'public', 'og');

async function convertSvgToPng() {
  console.log('Convertendo imagens OG de SVG para PNG...\n');

  const files = fs.readdirSync(ogDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  for (const svgFile of svgFiles) {
    const svgPath = path.join(ogDir, svgFile);
    const pngFile = svgFile.replace('.svg', '.png');
    const pngPath = path.join(ogDir, pngFile);

    try {
      await sharp(svgPath)
        .resize(1200, 630)
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(pngPath);

      console.log(`✓ ${svgFile} -> ${pngFile}`);
    } catch (error) {
      console.error(`✗ Erro ao converter ${svgFile}: ${error.message}`);
    }
  }

  console.log('\nConversão concluída!');
  console.log(`\nArquivos PNG gerados em: ${ogDir}`);
}

convertSvgToPng().catch(console.error);
