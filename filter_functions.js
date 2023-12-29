// ######################################################################################################################
//* filtering by BUS STOPS
// ######################################################################################################################

/**
 * @param {*} startStop 
 * @param {*} endStop 
 * @returns array of (indexes of bus lines) that contain both startStop and endStop
 */
function arrayIndexesLines(startStop, endStop) {
    // helper arrayIndexesLines - returns boolean of whether startStop appears before endStop in StringStops
    function containsBoth(StringStops, startStop, endStop) {
        const stops = StringStops.split(',').map(stop => stop.trim());
    
        const startStopIndex = stops.indexOf(startStop);
        const endStopIndex = stops.indexOf(endStop);
    
        console.log("hello world");
        console.log(startStopIndex + "" + endStopIndex)
    
        // Check if both startStop and endStop are present on the line
        return startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex;
    }

    const indexes = [];
    for (let i = 0; i < lines.length; i++) {
        if (containsBoth(lines[i], startStop, endStop)) {
            indexes.push(i + 1);
        }
    }
    return indexes;
}

// ######################################################################################################################
//* filtering by DATE/TIME
// ######################################################################################################################
/**
 * takes in an (unfiltered) string of bus times for one bus line, return filtered string by TIMES
 * @param {*} inputText a string of complete bus times (for one bus line)
 * @param {*} userPreferredTime a string for the preferred arrival time
 * @returns a string of times that arrive before userPreferredTime
 */
function filterLinesByTimes(inputText, userPreferredTime) {
    const filteredLineArray = [];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "3:00PM"
    const lines = inputText.split('\n').filter(item => item != "");
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const line_array = line.split(" ");

        // TODO start and end stops are not necessarily the first and last ones
        let startStopIndex = 0;
        let endStopIndex = line_array.length - 1;

        // ! TESTING start. 
        // const stops = lines[0].split(',').map(stop => stop.trim());
        // const startStop = document.getElementById('chosenStart').value;
        // const endStop = document.getElementById('chosenEnd').value;
        // startStopIndex = stops.indexOf(startStop);
        // endStopIndex = stops.indexOf(endStop);
        // ! TESTING end

        const startBusTime = line_array[startStopIndex]; 
        const endBusTime = line_array[endStopIndex].trim(); 

        if (compareTimes(currentTime, startBusTime) <= 0 && compareTimes(endBusTime, userPreferredTime) <= 0) {
            filteredLineArray.push(line);
        }
    }

    return filteredLineArray.join("\n");
}


/**
 * @param {*} time1 a string like 1:23PM or 4:56AM
 * @param {*} time2 a string like 1:23PM or 4:56AM
 * @returns an int time1-time2 representing difference in minutes
 */
function compareTimes(time1, time2) {
    // helper function for compareTimes. takes in 1:23PM, returns [1,23,'PM']
    function parseTime(time) {
        const period = time.slice(-2).toUpperCase();
        const timePart = time.slice(0, -2);
        const hours = parseInt(timePart.split(':')[0], 10);
        const minutes = parseInt(timePart.split(':')[1], 10);
    
        // console.log("parseTime: " + [hours, minutes, period]);
        return [hours, minutes, period];
    }

    const [hours1, minutes1, period1] = parseTime(time1);
    const [hours2, minutes2, period2] = parseTime(time2);

    // Convert 12-hour format to 24-hour format
    let adjustedHours1 = (period1 === 'PM' && hours1 !== 12) ? (hours1 + 12) : hours1;
    let adjustedHours2 = (period2 === 'PM' && hours2 !== 12) ? (hours2 + 12) : hours2;

    // adjust for 12AM
    if (hours1 === 12 && period1 === 'AM') adjustedHours1 = 0;
    if (hours2 === 12 && period2 === 'AM') adjustedHours2 = 0;

    return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
}