const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'HomePage.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const startLine = 85;
const endLine = 95;

console.log(`Inspecting lines ${startLine} to ${endLine}:`);

for (let i = startLine - 1; i < endLine; i++) {
    if (lines[i] !== undefined) {
        console.log(`Line ${i + 1}:`);
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            process.stdout.write(`${line[j]}(${line.charCodeAt(j)}) `);
        }
        console.log('\n---');
    }
}
