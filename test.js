const fs = require('fs');

function getStopsAfterString(filePath, searchString) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    
    const stopsAfterString = [];

    for (const line of lines) {
      const stops = line.split(',').map(stop => stop.trim());

      // Check if the line contains the search string
      if (stops.includes(searchString)) {
        // Find the index of the search string
        const searchStringIndex = stops.indexOf(searchString);

        // Add stops after the search string to the array (avoid duplicates)
        stopsAfterString.push(...stops.slice(searchStringIndex + 1).filter(stop => !stopsAfterString.includes(stop)));
      }
    }

    return stopsAfterString;
  } catch (error) {
    console.error('Error reading the file:', error.message);
    return [];
  }
}

// Example usage
const filePath = 'basic_info.txt';
const searchString = 'Main & Murray';
const stopsArray = getStopsAfterString(filePath, searchString);

console.log(`Stops after "${searchString}":`, stopsArray);
