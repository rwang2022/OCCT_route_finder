const lines = ['Leaves UDC, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves Union, Conklin & S.Washington, Tompkins & Conklin, BC Junction, Arrives at UDC', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Conklin & S.Washington, Tompkins & Conklin, BC Junction, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves UDC, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Union, UClub (Before 1AM), Arrives Downtown, UClub (After 1AM)', 'Leaves Union, UClub (Before 1AM), Arrives Downtown, UClub (After 1AM), Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'];
const uniqueStops = ['Arrives Downtown', 'Arrives at UDC', 'Arrives on Campus', 'BC Junction', 'Conklin & S.Washington', 'Floral & Main', 'Hillside', 'ITC', 'Leaves Downtown', 'Leaves Mohawk', 'Leaves Rafuse', 'Leaves UDC', 'Leaves Union', 'Leroy & Murray', 'Main & Floral', 'Main & Murray', 'Meadows & Hayes', 'Mountainview', 'Oakdale Commons', 'Parkway Plaza (Target)', 'Pharmacy School', 'Returns to Campus', 'Returns to Lower Campus', 'Returns to Mohawk', 'Riverside & Columbus', 'State & Hawley', 'Susquehanna', 'Tompkins & Conklin', 'Town Square Mall (Walmart)', 'UClub', 'UClub (After 1AM)', 'UClub (Before 1AM)', 'Washington & Lehigh', 'Wegmans'];
//* populate the start and destination stops dropdown
document.addEventListener('DOMContentLoaded', function () {
    // START stop
    const busStopsDropdown = document.getElementById('busStops');
    // Populate possible START stops
    uniqueStops.forEach(stop => {
        const option = document.createElement('option');
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
                const stopsAfterString = [];
                for (const line of lines) {
                    const stops = line.split(',').map(stop => stop.trim());
                    if (stops.includes(searchString)) {
                        const searchStringIndex = stops.indexOf(searchString);
                        stopsAfterString.push(...stops.slice(searchStringIndex + 1).filter(stop => !stopsAfterString.includes(stop)));
                    }
                }
                return stopsAfterString;
            }
            catch (error) {
                console.error('Error reading the file:', error.message);
                return [];
            }
        }
        const startStop = document.getElementById('chosenStart').value;
        const destinationStopsDropdown = document.getElementById("location2");
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
