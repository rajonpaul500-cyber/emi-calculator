const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const gaCode = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8XM9611FL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M8XM9611FL');
</script>`;

let updated = 0;
let skipped = 0;

for (const file of files) {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('G-M8XM9611FL')) {
        console.log(`SKIP ${file} - already has GA tag`);
        skipped++;
        continue;
    }

    // Insert GA code right after <head> tag
    const marker = /(<head>\s*)/i;
    if (marker.test(content)) {
        content = content.replace(marker, `$1${gaCode}\n  `);
        fs.writeFileSync(filePath, content);
        console.log(`OK   ${file}`);
        updated++;
    } else {
        console.log(`SKIP ${file} - no <head> tag found`);
        skipped++;
    }
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);