//* defined in main.js; here for reference. 
/* cSpell:disable */
// const lines = ['Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Rafuse, Parkway Plaza, Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'A lot, of places, on campus, sorry im lazy', 'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus']
// const busNumToInfo = { 1: ['WS Westside Outbound', 'Mon-Fri', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 2: ['DCL Downtown Center Leroy Inbound', 'Mon-Fri', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 3: ['DCL Downtown Center Leroy Outbound', 'Mon-Fri', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 4: ['WS Westside Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 5: ['UDC University Downtown Center Outbound', 'Mon-Fri', 'Leaves Union,Arrives at UDC'], 6: ['MS Main Street Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Main & Floral,Pharmacy School, Returns to Campus'], 7: ['MS Main Street Outbound', 'Mon-Fri', 'Leaves Union,Pharmacy School, Main & Floral, Main & Murray,Arrives at UDC'], 8: ['UDC University Downtown Center Inbound', 'Mon-Fri', 'Leaves UDC,Arrives on Campus'], 9: ['LRS Leroy Southside', 'Mon-Fri', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 10: ['IU ITC-UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk'], 11: ['UC UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, UClub, Washington & Lehigh'], 12: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Mon-Fri', 'Leaves Rafuse,ParkwayPlaza, Town Square Mall (Walmart), Returns to Campus'], 13: ['OC Oakdale Commons Shuttle', 'Mon-Fri', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 14: ['CS Campus Shuttle', 'Mon-Fri', 'A lot, ofPlaces, on campus, sorry im lazy'], 15: ['WS Westside Outbound', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 16: ['DCL Downtown Center Leroy Inbound', 'Saturday & Sunday', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 17: ['DCL Downtown Center Leroy Outbound', 'Saturday & Sunday', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 18: ['WS Westside Inbound', 'Saturday & Sunday', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 19: ['LRS Leroy Southside', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 20: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Saturday & Sunday', 'Leaves Rafuse,ParkwayPlaza (Target), Town Square Mall (Walmart), Returns to Campus'], 21: ['OC Oakdale Commons Shuttle', 'Saturday & Sunday', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 22: ['UC UClub Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, UClub, Washington & Lehigh'], 23: ['CS Campus Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'], 24: ['DE Downtown Express', 'Friday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 25: ['DE Downtown Express', 'Saturday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 26: ['WS Late Nite Westside Outbound', 'Friday & Saturday', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley'], 27: ['DCL Late Nite Downtown Center Leroy Inbound', 'Friday & Saturday', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 28: ['DCL Late Nite Downtown Center Leroy Outbound', 'Friday & Saturday', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley'], 29: ['WS Late Nite Westside Inbound', 'Friday & Saturday', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus'], 30: ['CS Late Nite Campus Shuttle', 'Friday & Saturday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'] }
// const uniqueStops = ['A lot', 'Arrives Downtown', 'Arrives at UDC', 'Arrives on Campus', 'Floral & Main', 'Hillside', 'ITC', 'Leaves Downtown', 'Leaves Mohawk', 'Leaves Rafuse', 'Leaves UDC', 'Leaves Union', 'Leroy & Murray', 'Leroy & Murray UClub (BY REQUEST)', 'Main & Floral', 'Main & Murray', 'Meadows & Hayes', 'Mountainview', 'Oakdale Commons', 'Parkway Plaza', 'Parkway Plaza (Target)', 'Pharmacy School', 'Returns to Campus', 'Returns to Lower Campus', 'Returns to Mohawk', 'Riverside & Columbus', 'State & Hawley', 'Susquehanna', 'Town Square Mall (Walmart)', 'UClub', 'UClub (After 1 AM)', 'UClub (BY REQUEST)', 'UClub (Before 1 AM)', 'Washington & Lehigh', 'Wegmans', 'of places', 'on campus', 'sorry im lazy']
/* cSpell:enable */
// ######################################################################################################################
//* populate the start and destination stops dropdown
// ######################################################################################################################
document.addEventListener('DOMContentLoaded', function () {
    // START stop
    var busStopsDropdown = document.getElementById('busStops');
    // Populate possible START stops
    uniqueStops.forEach(function (stop) {
        var option = document.createElement('option');
        option.value = stop;
        busStopsDropdown === null || busStopsDropdown === void 0 ? void 0 : busStopsDropdown.appendChild(option);
    });
    document.addEventListener('input', function () {
        /**
         * helper function for populating destination dropdown with possible stops
         * @param {string} searchString the startStop that the user chooses
         * @returns an array of possible destination stops
         */
        function getStopsAfterString(searchString) {
            try {
                var stopsAfterString_1 = [];
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    var stops = line.split(',').map(function (stop) { return stop.trim(); });
                    if (stops.includes(searchString)) {
                        var searchStringIndex = stops.indexOf(searchString);
                        stopsAfterString_1.push.apply(stopsAfterString_1, stops.slice(searchStringIndex + 1).filter(function (stop) { return !stopsAfterString_1.includes(stop); }));
                    }
                }
                return stopsAfterString_1;
            }
            catch (error) {
                console.error('Error reading the file:', error.message);
                return [];
            }
        }
        var startStop = document.getElementById('chosenStart').value;
        var destinationStopsDropdown = document.getElementById("location2");
        var destinationStops = getStopsAfterString(startStop); // array of possible END stops
        // Populate possible destination stops dropdown (depends on choice of START stop)
        destinationStopsDropdown.innerHTML = '';
        destinationStops.forEach(function (stop) {
            var option = document.createElement('option');
            option.value = stop;
            option.id = "busStop";
            destinationStopsDropdown.appendChild(option);
        });
    });
});
// Make it so that by default, "arriving by" time is 2 hours from now
document.addEventListener('DOMContentLoaded', function () {
    var currentTime = new Date();
    var arriveInHours = 2;
    currentTime.setHours(currentTime.getHours() + arriveInHours);
    var formattedTime = formatTime(currentTime);
    document.getElementById('userPreferredTime').value = formattedTime;
});
// Formats time as "hh:mmAM/PM"
function formatTime(date) {
    var hours = date.getHours() % 12 || 12;
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var period = date.getHours() < 12 ? 'AM' : 'PM';
    return hours + ":" + minutes + period;
}
// optional, prevents the submit button from being pressed more than once 
var submitButton = document.getElementById("submit_form");
var form = document.getElementById("email_form");
form.addEventListener("submit", function (e) {
    setTimeout(function () {
        submitButton.value = "Sending...";
        submitButton.disabled = true;
    }, 1);
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
    var filePath = "full info.txt";
    var targetPage = "PAGE " + pageNumber;
    fetch(filePath)
        // get the text of the filePath file, call this data
        .then(function (response) {
        if (!response.ok)
            throw new Error("Error loading " + filePath + ": " + response.status + " " + response.statusText);
        return response.text();
    })
        // given data, return a string containing the bus stops and the bus times
        .then(function (data) {
        var lines = data.split('\n');
        var startIndex = lines.findIndex(function (line) { return line.includes(targetPage); });
        if (startIndex === -1)
            throw new Error("Page " + pageNumber + " not found");
        var endIndex = lines.findIndex(function (line, index) { return index > startIndex && line.includes("PAGE " + (pageNumber + 1)); });
        //* it was startIndex + 4 at one point, which excluded bus stops line (so it was only the bus times)
        var result = lines.slice(startIndex + 3, endIndex !== -1 ? endIndex : undefined).join('\n');
        callback(null, result);
    })["catch"](function (error) { return callback(error, null); });
}
/**
 * given busNumber + already filtered bus schedule text
 * create a bus div and add to output div
 */
function createBusDiv(busNumber, scheduleText) {
    var startStop = document.getElementById('chosenStart').value;
    var endStop = document.getElementById('chosenEnd').value;
    var busName = busNumToInfo[busNumber][0];
    var busDaysOfWeek = busNumToInfo[busNumber][1];
    var busStopsList = busNumToInfo[busNumber][2];
    /**
    * compare busDaysOfWeek to today, avoid displaying useless info
    * @param {string} dateString bus dates: either "Mon-Fri" or "Saturday & Sunday"
    * @returns boolean of if today matches dateString
    */
    function datesMatch(dateString) {
        dateString.trim();
        var dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
        if (dateString === 'Mon-Fri')
            return dayOfWeek >= 1 && dayOfWeek <= 5;
        else if (dateString === 'Saturday & Sunday')
            return dayOfWeek === 0 || dayOfWeek === 6;
        else
            return false;
    }
    if (!datesMatch(busDaysOfWeek))
        return;
    var output = document.getElementById("output");
    var busDiv = document.createElement('div');
    // Attach header info to bus div
    var busGeneralInfo = document.createElement('h2');
    busGeneralInfo.textContent = "#" + busNumber + " " + busName + " " + busDaysOfWeek;
    busDiv.appendChild(busGeneralInfo);
    // Display busStopsList in the table header row
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    // Header Row: split busStopsList into columns
    var stops = busStopsList.split(',');
    stops.forEach(function (stop) {
        var th = document.createElement('th');
        th.textContent = stop.trim();
        if (th.textContent == startStop || th.textContent == endStop) {
            th.style.backgroundColor = '#5E716A';
        }
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    busDiv.appendChild(table);
    // Display scheduleText (which contains the times) in the table body
    var tbody = document.createElement('tbody');
    // Split scheduleText into rows, remove whitespace rows
    var scheduleRows = scheduleText.split('\n').map(function (row) { return row.trim(); }).filter(function (row) { return row; });
    if (scheduleRows.length == 0)
        return; // if empty bus times don't display
    scheduleRows.forEach(function (row) {
        var tr = document.createElement('tr');
        // Split each row into columns
        var columns = row.split(' ');
        columns.forEach(function (column) {
            var td = document.createElement('td');
            td.textContent = column.trim();
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    if (output != null)
        output.appendChild(busDiv);
}
function displayAllFilteredBuses() {
    var startStop = document.getElementById('chosenStart').value;
    var endStop = document.getElementById('chosenEnd').value;
    var preferredArrivalTime = document.getElementById("userPreferredTime").value;
    var busLinesIndexes = arrayIndexesLines(startStop, endStop); // buses that contain startStop and endStop
    // clear previous bus info and console
    var output = document.getElementById("output");
    if (output !== null)
        output.innerHTML = "";
    console.clear();
    var _loop_1 = function (i) {
        var busNumber = busLinesIndexes[i];
        getTextForPage(busNumber, function (error, result) {
            if (error) {
                console.error(error.message);
                return;
            }
            if (filterLinesByTimes(result, preferredArrivalTime) !== undefined) {
                createBusDiv(busNumber, filterLinesByTimes(result, preferredArrivalTime));
            }
        });
    };
    // for each of the bus lines, get the bus times and create a bus div 
    for (var i = 0; i < busLinesIndexes.length; i++) {
        _loop_1(i);
    }
}
