const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
// Extract all script blocks
const re = /<script>([\s\S]*?)<\/script>/g;
let match;
let idx = 0;
while ((match = re.exec(html)) !== null) {
    idx++;
    const js = match[1];
    const startLine = html.substring(0, match.index).split('\n').length;
    try {
        new Function(js);
        console.log('Script block #' + idx + ' (line ~' + startLine + '): OK');
    } catch(e) {
        console.log('Script block #' + idx + ' (line ~' + startLine + '): SYNTAX ERROR: ' + e.message);
    }
}
if (idx === 0) console.log('No script blocks found');
