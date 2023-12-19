// given startStop, return an array of possible destination stops.
function getStopsAfterString(searchString) {
    try {
        const stopsAfterString = [];
        for (const line of lines) {
            const stops = line.split(',').map(stop => stop.trim());
            if (stops.includes(searchString)) {
                const searchStringIndex = stops.indexOf(searchString);
                stopsAfterString.push(...stops.slice(searchStringIndex + 1).filter(stop => !stopsAfterString.includes(stop)));
            }
        }
        return stopsAfterString;
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return [];
    }
}

// returns boolean of whether startStop appears before endStop in StringStops
function containsBoth(StringStops, startStop, endStop) {
    const stops = StringStops.split(',').map(stop => stop.trim());

    const startStopIndex = stops.indexOf(startStop);
    const endStopIndex = stops.indexOf(endStop);

    // Check if both startStop and endStop are present on the line
    return startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex;
}

// returns array of indexes of lines, i, such that containsBoth(lines[i], startStop, endStop) 
function arrayIndexesLines(startStop, endStop) {
    const indexes = [];
    for (let i = 0; i < lines.length; i++) {
        if (containsBoth(lines[i], startStop, endStop)) {
            indexes.push(i + 1);
        }
    }
    return indexes;
}

// helper function for compareTimes. takes in 1:23PM, returns [1,23,'PM']
function parseTime(time) {
    const period = time.slice(-2).toUpperCase();
    const timePart = time.slice(0, -2);
    const hours = parseInt(timePart.split(':')[0], 10);
    const minutes = parseInt(timePart.split(':')[1], 10);

    // console.log("parseTime: " + [hours, minutes, period]);
    return [hours, minutes, period];
}

// takes in 1:23PM, 2:34AM => parseTime. returns time1 - time2, takes into account AM/PM
function compareTimes(time1, time2) {
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

// helper to createBusDiv() - compare busDaysOfWeek to today, avoid displaying useless info
// takes either "Mon-Fri" or "Saturday & Sunday" 
// returns whether today matches that 
function datesMatch(dateString) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

    if (dateString === 'Mon-Fri') {
        return dayOfWeek >= 1 && dayOfWeek <= 5;
    } else if (dateString === 'Saturday & Sunday') {
        return dayOfWeek === 0 || dayOfWeek === 6;
    } else {
        return false;
    }
}

// takes in an (unfiltered) string of bus times for one bus line
// returns filtered string containing only times AFTER current time
// TODO also filter times BEFORE some desired time (e.g. before 5pm or within 3 hours)
function filterLinesByTimes(inputText, userPreferredTime) {
    const filteredLineArray = [];
    // const currentTime = "3:00PM";
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const lines = inputText.split('\n').filter(item => item != "");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const line_array = line.split(" ");
        const leftTime = line_array[0]; // TODO the start stop is not necessarily index 0!
        const rightTime = line_array[line_array.length - 1].trim(); // TODO the end stop is not necessarily the last index!

        const diff1 = compareTimes(currentTime, leftTime);
        const diff2 = compareTimes(rightTime, userPreferredTime);
        // console.log(rightTime + " - " + userPreferredTime + " = " + diff2); 
        if (diff1 <= 0 && diff2 <= 0) {
            filteredLineArray.push(line);
        }
    }
    // console.log("filteredLineArray: " + filteredLineArray);
    return filteredLineArray.join("\n");
}


// helper function to displayAllFilteredBuses(): takes in a single page number, return (unfiltered) bus times as a string 
function getTextForPage(pageNumber, callback) {
    // console.log("bus number " + pageNumber);
    const filePath = "full info.txt"
    const targetPage = `PAGE ${pageNumber}`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${filePath}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            const startIndex = lines.findIndex(line => line.includes(targetPage));

            if (startIndex === -1) {
                throw new Error(`Page ${pageNumber} not found`);
            }
            const endIndex = lines.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));

            const result = lines.slice(startIndex + 4, endIndex !== -1 ? endIndex : undefined).join('\n');
            callback(null, result);
        })
        .catch(error => callback(error, null));
}