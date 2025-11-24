const fs = require('fs');
const path = require('path');

const backupPath = path.join(__dirname, 'src', 'components', 'HomePage.backup.tsx');
const targetPath = path.join(__dirname, 'src', 'components', 'HomePage.tsx');

try {
    let content = fs.readFileSync(backupPath, 'utf8');

    // Apply fixes
    // 1. Fix malformed closing tags
    content = content.replace(/<\/section >/g, '</section>');
    content = content.replace(/<\/main >/g, '</main>');

    // 2. Fix malformed opening tags (remove spaces after <)
    content = content.replace(/< section/g, '<section');

    // 3. Uncomment Particles
    // Handle various potential formatting of the commented block
    content = content.replace(/{\/\*\s*<Particles/g, '<Particles');
    content = content.replace(/\/>\s*\*\/\}/g, '/>');

    // 4. Update Marketing to Audiovisual in the form label
    content = content.replace('Aceito receber contato da Andorinha Marketing *', 'Aceito receber contato da Andorinha Audiovisual *');

    fs.writeFileSync(targetPath, content, 'utf8');
    console.log('HomePage.tsx has been fixed and written.');
} catch (err) {
    console.error('Error fixing HomePage.tsx:', err);
    process.exit(1);
}
