//* defined in main.js; here for reference. 
/* cSpell:disable */
// const lines = ['Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Rafuse, Parkway Plaza, Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'A lot, of places, on campus, sorry im lazy', 'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus']
// const busNumToInfo = { 1: ['WS Westside Outbound', 'Mon-Fri', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 2: ['DCL Downtown Center Leroy Inbound', 'Mon-Fri', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 3: ['DCL Downtown Center Leroy Outbound', 'Mon-Fri', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 4: ['WS Westside Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 5: ['UDC University Downtown Center Outbound', 'Mon-Fri', 'Leaves Union,Arrives at UDC'], 6: ['MS Main Street Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Main & Floral,Pharmacy School, Returns to Campus'], 7: ['MS Main Street Outbound', 'Mon-Fri', 'Leaves Union,Pharmacy School, Main & Floral, Main & Murray,Arrives at UDC'], 8: ['UDC University Downtown Center Inbound', 'Mon-Fri', 'Leaves UDC,Arrives on Campus'], 9: ['LRS Leroy Southside', 'Mon-Fri', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 10: ['IU ITC-UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk'], 11: ['UC UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, UClub, Washington & Lehigh'], 12: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Mon-Fri', 'Leaves Rafuse,ParkwayPlaza, Town Square Mall (Walmart), Returns to Campus'], 13: ['OC Oakdale Commons Shuttle', 'Mon-Fri', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 14: ['CS Campus Shuttle', 'Mon-Fri', 'A lot, ofPlaces, on campus, sorry im lazy'], 15: ['WS Westside Outbound', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 16: ['DCL Downtown Center Leroy Inbound', 'Saturday & Sunday', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 17: ['DCL Downtown Center Leroy Outbound', 'Saturday & Sunday', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 18: ['WS Westside Inbound', 'Saturday & Sunday', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 19: ['LRS Leroy Southside', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 20: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Saturday & Sunday', 'Leaves Rafuse,ParkwayPlaza (Target), Town Square Mall (Walmart), Returns to Campus'], 21: ['OC Oakdale Commons Shuttle', 'Saturday & Sunday', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 22: ['UC UClub Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, UClub, Washington & Lehigh'], 23: ['CS Campus Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'], 24: ['DE Downtown Express', 'Friday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 25: ['DE Downtown Express', 'Saturday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 26: ['WS Late Nite Westside Outbound', 'Friday & Saturday', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley'], 27: ['DCL Late Nite Downtown Center Leroy Inbound', 'Friday & Saturday', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 28: ['DCL Late Nite Downtown Center Leroy Outbound', 'Friday & Saturday', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley'], 29: ['WS Late Nite Westside Inbound', 'Friday & Saturday', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus'], 30: ['CS Late Nite Campus Shuttle', 'Friday & Saturday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'] }
// const uniqueStops = ['A lot', 'Arrives Downtown', 'Arrives at UDC', 'Arrives on Campus', 'Floral & Main', 'Hillside', 'ITC', 'Leaves Downtown', 'Leaves Mohawk', 'Leaves Rafuse', 'Leaves UDC', 'Leaves Union', 'Leroy & Murray', 'Leroy & Murray UClub (BY REQUEST)', 'Main & Floral', 'Main & Murray', 'Meadows & Hayes', 'Mountainview', 'Oakdale Commons', 'Parkway Plaza', 'Parkway Plaza (Target)', 'Pharmacy School', 'Returns to Campus', 'Returns to Lower Campus', 'Returns to Mohawk', 'Riverside & Columbus', 'State & Hawley', 'Susquehanna', 'Town Square Mall (Walmart)', 'UClub', 'UClub (After 1 AM)', 'UClub (BY REQUEST)', 'UClub (Before 1 AM)', 'Washington & Lehigh', 'Wegmans', 'of places', 'on campus', 'sorry im lazy']
/* cSpell:enable */

// ######################################################################################################################
//* filtering by BUS STOPS
// ######################################################################################################################

/**
 * @param {*} startStop 
 * @param {*} endStop 
 * @returns array of (indexes of bus lines) that contain both startStop and endStop
 */
function arrayIndexesLines(startStop: string, endStop: string) {
    // helper arrayIndexesLines - returns boolean of whether startStop appears before endStop in StringStops
    function containsBoth(StringStops, startStop, endStop) {
        const stops = StringStops.split(',').map(stop => stop.trim());
    
        const startStopIndex = stops.indexOf(startStop);
        const endStopIndex = stops.indexOf(endStop);
    
        // Check if both startStop and endStop are present on the line
        return startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex;
    }

    const indexes: number[] = [];
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
function filterLinesByTimes(inputText: string, userPreferredTime: string) {
    const filteredLineArray: string[] = [];
    const currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "3:00PM"
    const completeBusInfo: string[] = inputText.split('\n').filter(item => item != "");
    
    const stops: string[] = completeBusInfo[0].split(',').map(stop => stop.trim());
    const startStop: string = (document.getElementById('chosenStart') as HTMLInputElement).value;
    const endStop: string = (document.getElementById('chosenEnd') as HTMLInputElement).value;
    const startStopIndex: number = stops.indexOf(startStop);
    const endStopIndex: number = stops.indexOf(endStop);
    console.log("endStopIndex: " + endStopIndex);
    

    for (let i = 1; i < completeBusInfo.length; i++) {
        const line: string = completeBusInfo[i]; // "7:35AM 7:44AM 7:50AM 8:00AM"
        const line_array: string[] = line.split(" "); // above as array
        const startBusTime: string = line_array[startStopIndex];
        const endBusTime: string = line_array[endStopIndex];
        
        if ((compareTimes(currentTime, startBusTime) <= 0) && (compareTimes(endBusTime, userPreferredTime) <= 0)) {
            // console.log(currentTime + " - " + startBusTime + " = " + compareTimes(currentTime, startBusTime));
            console.log(endBusTime + " - " + userPreferredTime + " = " + compareTimes(endBusTime, userPreferredTime));
            filteredLineArray.push(line);
        }
    }

    return filteredLineArray.join("\n");
}


/**
 * @param {*} time1 e.g. "1:23PM" or "4:56AM"
 * @param {*} time2 e.g. "1:23PM" or "4:56AM"
 * @returns an int time1-time2 representing difference in minutes
 */
function compareTimes(time1: string, time2: string) {
    // helper function for compareTimes. takes in 1:23PM, returns [1,23,'PM']
    function parseTime(time: string) {
        const period: string = time.trim().slice(-2).toUpperCase();
        const timePart: string = time.slice(0, -2);
        const hours: number = parseInt(timePart.split(':')[0], 10);
        const minutes: number = parseInt(timePart.split(':')[1], 10);
        const periodValue: number = (period==='PM') ? 1 : 0;
        
        return [hours, minutes, periodValue];
    }

    const [hours1, minutes1, period1] = parseTime(time1);
    const [hours2, minutes2, period2] = parseTime(time2);

    // Convert 12-hour format to 24-hour format
    let adjustedHours1 = (period1 === 1 && hours1 !== 12) ? (hours1 + 12) : hours1;
    let adjustedHours2 = (period2 === 1 && hours2 !== 12) ? (hours2 + 12) : hours2;

    // adjust for 12AM
    if (hours1 === 12 && period1 === 0) adjustedHours1 = 0;
    if (hours2 === 12 && period2 === 0) adjustedHours2 = 0;

    return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
}