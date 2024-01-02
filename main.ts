/* cSpell:disable */
//* we will be relying on these globals. bad practice, don't do this.
const lines = ['Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Rafuse, Parkway Plaza, Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'A lot, of places, on campus, sorry im lazy', 'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus']
const busNumToInfo = { 1: ['WS Westside Outbound', 'Mon-Fri', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 2: ['DCL Downtown Center Leroy Inbound', 'Mon-Fri', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 3: ['DCL Downtown Center Leroy Outbound', 'Mon-Fri', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 4: ['WS Westside Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 5: ['UDC University Downtown Center Outbound', 'Mon-Fri', 'Leaves Union,Arrives at UDC'], 6: ['MS Main Street Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Main & Floral,Pharmacy School, Returns to Campus'], 7: ['MS Main Street Outbound', 'Mon-Fri', 'Leaves Union,Pharmacy School, Main & Floral, Main & Murray,Arrives at UDC'], 8: ['UDC University Downtown Center Inbound', 'Mon-Fri', 'Leaves UDC,Arrives on Campus'], 9: ['LRS Leroy Southside', 'Mon-Fri', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 10: ['IU ITC-UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk'], 11: ['UC UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, UClub, Washington & Lehigh'], 12: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Mon-Fri', 'Leaves Rafuse,ParkwayPlaza, Town Square Mall (Walmart), Returns to Campus'], 13: ['OC Oakdale Commons Shuttle', 'Mon-Fri', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 14: ['CS Campus Shuttle', 'Mon-Fri', 'A lot, ofPlaces, on campus, sorry im lazy'], 15: ['WS Westside Outbound', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 16: ['DCL Downtown Center Leroy Inbound', 'Saturday & Sunday', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 17: ['DCL Downtown Center Leroy Outbound', 'Saturday & Sunday', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 18: ['WS Westside Inbound', 'Saturday & Sunday', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 19: ['LRS Leroy Southside', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 20: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Saturday & Sunday', 'Leaves Rafuse,ParkwayPlaza (Target), Town Square Mall (Walmart), Returns to Campus'], 21: ['OC Oakdale Commons Shuttle', 'Saturday & Sunday', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 22: ['UC UClub Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, UClub, Washington & Lehigh'], 23: ['CS Campus Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'], 24: ['DE Downtown Express', 'Friday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 25: ['DE Downtown Express', 'Saturday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 26: ['WS Late Nite Westside Outbound', 'Friday & Saturday', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley'], 27: ['DCL Late Nite Downtown Center Leroy Inbound', 'Friday & Saturday', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 28: ['DCL Late Nite Downtown Center Leroy Outbound', 'Friday & Saturday', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley'], 29: ['WS Late Nite Westside Inbound', 'Friday & Saturday', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus'], 30: ['CS Late Nite Campus Shuttle', 'Friday & Saturday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'] }
const uniqueStops = ['A lot', 'Arrives Downtown', 'Arrives at UDC', 'Arrives on Campus', 'Floral & Main', 'Hillside', 'ITC', 'Leaves Downtown', 'Leaves Mohawk', 'Leaves Rafuse', 'Leaves UDC', 'Leaves Union', 'Leroy & Murray', 'Leroy & Murray UClub (BY REQUEST)', 'Main & Floral', 'Main & Murray', 'Meadows & Hayes', 'Mountainview', 'Oakdale Commons', 'Parkway Plaza', 'Parkway Plaza (Target)', 'Pharmacy School', 'Returns to Campus', 'Returns to Lower Campus', 'Returns to Mohawk', 'Riverside & Columbus', 'State & Hawley', 'Susquehanna', 'Town Square Mall (Walmart)', 'UClub', 'UClub (After 1 AM)', 'UClub (BY REQUEST)', 'UClub (Before 1 AM)', 'Washington & Lehigh', 'Wegmans', 'of places', 'on campus', 'sorry im lazy']
/* cSpell:enable */

// ######################################################################################################################
//* populate the start and destination stops dropdown
// ######################################################################################################################

document.addEventListener('DOMContentLoaded', function () {
    // START stop
    const busStopsDropdown = document.getElementById('busStops');

    // Populate possible START stops
    uniqueStops.forEach(stop => {
        const option = document.createElement('option');
        option.value = stop;
        busStopsDropdown?.appendChild(option);
    });

    document.addEventListener('input', function () {
        /**
         * helper function for populating destination dropdown with possible stops
         * @param {string} searchString the startStop that the user chooses
         * @returns an array of possible destination stops
         */
        function getStopsAfterString(searchString) {
            try {
                const stopsAfterString: string[] = [];
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

        const startStop = (document.getElementById('chosenStart') as HTMLInputElement).value;
        const destinationStopsDropdown = document.getElementById("location2") as HTMLInputElement;
        const destinationStops = getStopsAfterString(startStop); // array of possible END stops

        // Populate possible destination stops dropdown (depends on choice of START stop)
        destinationStopsDropdown.innerHTML = '';
        destinationStops.forEach(stop => {
            const option = document.createElement('option');
            option.value = stop;
            option.id = "busStop";
            destinationStopsDropdown.appendChild(option);
        });
    });
});

// ######################################################################################################################
//* functions for RETRIEVING + DISPLAYING INFO
// ######################################################################################################################

//* the format of "full info.txt"
/* PAGE 1 - //* startIndex
   WS Westside Outbound // cspell: disable-line 
   Mon-Fri
   Leaves Union, Floral & Main, Main & Murray, Arrives at UDC //* startIndex + 3
   7:35AM 7:44AM 7:50AM 8:00AM
   more times...
   more and more times... and finally...
   PAGE 2 - //* endIndex
*/

/**
 * given page #, return (unfiltered/raw) bus times (string, not array)
 * @param {*} pageNumber what page # of the bus you want
 * @param {*} callback idk tbh
 */
function getTextForPage(pageNumber, callback) {
    const filePath = "full info.txt"
    const targetPage = `PAGE ${pageNumber}`;

    fetch(filePath)
        // get the text of the filePath file, call this data
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${filePath}: ${response.status} ${response.statusText}`);
            return response.text();
        })
        // given data, return a string containing the bus stops and the bus times
        .then(data => {
            const lines = data.split('\n');
            
            const startIndex = lines.findIndex(line => line.includes(targetPage));
            if (startIndex === -1) throw new Error(`Page ${pageNumber} not found`);
            const endIndex = lines.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));
            
            //* it was startIndex + 4 at one point, which excluded bus stops line (so it was only the bus times)
            const result = lines.slice(startIndex + 3, endIndex !== -1 ? endIndex : undefined).join('\n');
            callback(null, result);
        })
        // catch any errors hmmm
        .catch(error => callback(error, null));
}

// TODO this function should not display tables that have no rows
// takes in (filtered) times for one bus and displays information in a div/table
function createBusDiv(busNumber: number, scheduleText: string) {
    const startStop = (document.getElementById('chosenStart') as HTMLInputElement).value;
    const endStop = (document.getElementById('chosenEnd') as HTMLInputElement).value;

    const busName = busNumToInfo[busNumber][0];
    const busDaysOfWeek = busNumToInfo[busNumber][1];
    const busStopsList = busNumToInfo[busNumber][2];

    /**
    * compare busDaysOfWeek to today, avoid displaying useless info
    * @param {string} dateString bus dates: either "Mon-Fri" or "Saturday & Sunday"
    * @returns boolean of if today matches dateString
    */
    function datesMatch(dateString: string) {
        const dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

        if (dateString === 'Mon-Fri') return dayOfWeek >= 1 && dayOfWeek <= 5;
        else if (dateString === 'Saturday & Sunday') return dayOfWeek === 0 || dayOfWeek === 6;
        else return false;
    }

    if (!datesMatch(busDaysOfWeek)) return;

    const output = document.getElementById("output");
    const busDiv = document.createElement('div');

    const busGeneralInfo = document.createElement('h2');
    busGeneralInfo.textContent = "#" + busNumber + " " + busName + " " + busDaysOfWeek;
    busDiv.appendChild(busGeneralInfo);

    // Display busStopsList as a table header
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    // Split busStopsList into columns
    const stops = busStopsList.split(',');
    stops.forEach(stop => {
        const th = document.createElement('th');
        th.textContent = stop.trim();
        if (th.textContent == startStop || th.textContent == endStop) {
            th.style.backgroundColor = '#5E716A';
        }
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
    busDiv.appendChild(table);

    // Display scheduleText as table rows and columns
    const tbody = document.createElement('tbody');

    // Split scheduleText into rows, remove whitespace rows
    const scheduleRows = scheduleText.split('\n').map(row => row.trim()).filter(row => row);
    console.log("scheduleRows: " + scheduleRows);

    scheduleRows.forEach(row => {
        const tr = document.createElement('tr');

        // Split each row into columns
        const columns = row.split(' ');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column.trim();
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    if (output != null) output.appendChild(busDiv);
}

function displayAllFilteredBuses() {
    const startStop = (document.getElementById('chosenStart') as HTMLInputElement).value;
    const endStop = (document.getElementById('chosenEnd') as HTMLInputElement).value;
    const preferredArrivalTime = (document.getElementById("userPreferredTime") as HTMLInputElement).value;
    const busLinesIndexes = arrayIndexesLines(startStop, endStop); // buses that contain startStop and endStop

    // clear previous bus info and console
    const output = document.getElementById("output");
    if (output !== null) output.innerHTML = "";
    console.clear();

    // for each of the bus lines, get the bus times and create a bus div 
    for (let i = 0; i < busLinesIndexes.length; i++) {
        const busNumber = busLinesIndexes[i];
        //* get the bus times
        getTextForPage(busNumber, (error, result) => {
            if (error) { console.error(error.message); return; }

            if (filterLinesByTimes(result, preferredArrivalTime) !== undefined) {
                //* display the relevant info in a bus div
                createBusDiv(busLinesIndexes[i], filterLinesByTimes(result, preferredArrivalTime));
            } else {
                console.log("Bus " + busNumber + " is not running right now.");
            }
        });
    }
}
