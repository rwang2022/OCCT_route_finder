const fs = require('fs');

function getTextForPage(filePath, pageNumber, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }

    const lines = data.split('\n');
    const targetPage = `PAGE ${pageNumber}`;
    const startIndex = lines.findIndex(line => line.includes(targetPage));

    if (startIndex === -1) {
      return callback(new Error(`Page ${pageNumber} not found`), null);
    }

    const endIndex = lines.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));

    const result = lines.slice(startIndex + 4, endIndex !== -1 ? endIndex : undefined).join('\n');
    callback(null, result);
  });
}

// Example usage
const filePath = 'full info.txt';
const pageNumber = 5;

getTextForPage(filePath, pageNumber, (err, text) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log('Text for PAGE', pageNumber, ':\n', text);
});
