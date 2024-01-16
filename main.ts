/* cSpell:disable */
//* we will be relying on these globals. bad practice, don't do this.
const lines = ['Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Arrives at UDC', 'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus', 'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC', 'Leaves UDC, Arrives on Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Rafuse, Parkway Plaza, Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'A lot, of places, on campus, sorry im lazy', 'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus', 'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus', 'Leaves Mohawk, UClub, Washington & Lehigh', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus']
// const busNumToInfo = { 1: ['WS Westside Outbound', 'Mon-Fri', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 2: ['DCL Downtown Center Leroy Inbound', 'Mon-Fri', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 3: ['DCL Downtown Center Leroy Outbound', 'Mon-Fri', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 4: ['WS Westside Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 5: ['UDC University Downtown Center Outbound', 'Mon-Fri', 'Leaves Union,Arrives at UDC'], 6: ['MS Main Street Inbound', 'Mon-Fri', 'Leaves UDC, Main & Murray, Main & Floral,Pharmacy School, Returns to Campus'], 7: ['MS Main Street Outbound', 'Mon-Fri', 'Leaves Union,Pharmacy School, Main & Floral, Main & Murray,Arrives at UDC'], 8: ['UDC University Downtown Center Inbound', 'Mon-Fri', 'Leaves UDC,Arrives on Campus'], 9: ['LRS Leroy Southside', 'Mon-Fri', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 10: ['IU ITC-UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk'], 11: ['UC UClub Shuttle', 'Mon-Fri', 'Leaves Mohawk, UClub, Washington & Lehigh'], 12: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Mon-Fri', 'Leaves Rafuse,ParkwayPlaza, Town Square Mall (Walmart), Returns to Campus'], 13: ['OC Oakdale Commons Shuttle', 'Mon-Fri', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 14: ['CS Campus Shuttle', 'Mon-Fri', 'A lot, ofPlaces, on campus, sorry im lazy'], 15: ['WS Westside Outbound', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Main & Murray,Arrives at UDC'], 16: ['DCL Downtown Center Leroy Inbound', 'Saturday & Sunday', 'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 17: ['DCL Downtown Center Leroy Outbound', 'Saturday & Sunday', 'Leaves Union, Riverside & Columbus, Leroy & Murray,Arrives at UDC'], 18: ['WS Westside Inbound', 'Saturday & Sunday', 'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus'], 19: ['LRS Leroy Southside', 'Saturday & Sunday', 'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus'], 20: ['RRT Riviera Ridge - Town Square Mall Shuttle', 'Saturday & Sunday', 'Leaves Rafuse,ParkwayPlaza (Target), Town Square Mall (Walmart), Returns to Campus'], 21: ['OC Oakdale Commons Shuttle', 'Saturday & Sunday', 'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus'], 22: ['UC UClub Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, UClub, Washington & Lehigh'], 23: ['CS Campus Shuttle', 'Saturday & Sunday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'], 24: ['DE Downtown Express', 'Friday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 25: ['DE Downtown Express', 'Saturday', 'Leaves Union, UClub (Before 1AM),Arrives Downtown, UClub (After 1AM), Returns to Campus'], 26: ['WS Late Nite Westside Outbound', 'Friday & Saturday', 'Leaves Union, Floral & Main, Main & Murray, State & Hawley'], 27: ['DCL Late Nite Downtown Center Leroy Inbound', 'Friday & Saturday', 'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus'], 28: ['DCL Late Nite Downtown Center Leroy Outbound', 'Friday & Saturday', 'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley'], 29: ['WS Late Nite Westside Inbound', 'Friday & Saturday', 'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus'], 30: ['CS Late Nite Campus Shuttle', 'Friday & Saturday', 'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'] }
const uniqueStops = ['A lot', 'Arrives Downtown', 'Arrives at UDC', 'Arrives on Campus', 'Floral & Main', 'Hillside', 'ITC', 'Leaves Downtown', 'Leaves Mohawk', 'Leaves Rafuse', 'Leaves UDC', 'Leaves Union', 'Leroy & Murray', 'UClub (BY REQUEST)', 'Main & Floral', 'Main & Murray', 'Meadows & Hayes', 'Mountainview', 'Oakdale Commons', 'Parkway Plaza', 'Parkway Plaza (Target)', 'Pharmacy School', 'Returns to Campus', 'Returns to Lower Campus', 'Returns to Mohawk', 'Riverside & Columbus', 'State & Hawley', 'Susquehanna', 'Town Square Mall (Walmart)', 'UClub', 'UClub (After 1 AM)', 'UClub (BY REQUEST)', 'UClub (Before 1 AM)', 'Washington & Lehigh', 'Wegmans', 'of places', 'on campus', 'sorry im lazy']
/* cSpell:enable */ 


//* populate the start and destination stops dropdown
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
        function getStopsAfterString(searchString: string): string[]{
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


// //* Set default departingTime and arrivalTime
// document.addEventListener('DOMContentLoaded', function () {
//     // Formats time as "hh:mmAM/PM"
//     function formatTime(date) {
//         const hours = date.getHours() % 12 || 12;
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         const period = date.getHours() < 12 ? 'AM' : 'PM';
//         return `${hours}:${minutes}${period}`;
//     }

//     const currentTime = new Date();
//     (document.getElementById('departingTime') as HTMLInputElement).value = formatTime(currentTime);
    
//     const arriveInHours = 3;
//     const laterTime = currentTime; 
//     laterTime.setHours(currentTime.getHours() + arriveInHours);
//     (document.getElementById('arrivalTime') as HTMLInputElement).value = formatTime(laterTime);
// });
