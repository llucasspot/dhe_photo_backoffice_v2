const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const mkdirp = require('mkdirp');

const harFilePath = './lala.har';
const outputDir = './spa-files';
const baseUrl = 'https://app.lumys-scolaire.photo';

const har = JSON.parse(fs.readFileSync(harFilePath, 'utf-8'));

mkdirp.sync(outputDir);

// Process entries
har.log.entries.forEach((entry) => {
  try {
    const url = entry.request.url;
    const content = entry.response.content;

    if (!content || !url || !url.startsWith(baseUrl)) return;

    // Parse URL to handle query parameters and fragments
    const parsedUrl = new URL(url);
    let filename = parsedUrl.pathname;

    // Handle root path
    if (filename === '/') {
      filename = '/index.html';
    }

    // Remove leading slash for cleaner paths
    filename = filename.substring(1);

    // Handle empty filename (shouldn't happen due to above check)
    if (!filename) return;

    const filePath = path.join(outputDir, filename);

    // Create directory structure
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file content
    let body;
    if (content.encoding === 'base64') {
      body = Buffer.from(content.text, 'base64');
    } else {
      body = Buffer.from(content.text, 'utf-8');
    }

    fs.writeFileSync(filePath, body);
    console.log(`Saved: ${filePath}`);
  } catch (e) {
    console.error(`Error processing entry: ${e.message}`);
  }
});

console.log(`Files saved to ${outputDir}`);
console.log('You can now run: npx serve ./spa-files');