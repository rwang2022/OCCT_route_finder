const fs = require('fs');

function getStopsAfterSelectedStop(selectedStop, filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    
    let stopsFound = false;
    const stopsAfterSelectedStop = [];

    for (const line of lines) {
      const stops = line.split(',').map(stop => stop.trim());
      
      if (stopsFound) {
        stopsAfterSelectedStop.push(...stops);
      }

      if (stops.includes(selectedStop)) {
        stopsFound = true;
      }
    }

    return stopsAfterSelectedStop;
  } catch (error) {
    console.error('Error reading the file:', error.message);
    return [];
  }
}

// Example usage
const selectedStop = 'Floral & Main';
const filePath = 'basic_info.txt';
const stopsArray = getStopsAfterSelectedStop(selectedStop, filePath);

console.log('Stops after', selectedStop, ':', stopsArray);
