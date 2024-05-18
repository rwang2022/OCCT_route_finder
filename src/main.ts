const lines = [
    'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC',
    'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus',
    'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC',
    'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus',
    'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus',
    'Leaves Mohawk, UClub, Washington & Lehigh',
    'Leaves Union, Hillside, Mohawk, ITC, UClub',
    'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC',
    'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus',
    'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC',
    'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus',
    'Leaves Mohawk, UClub, Washington & Lehigh'
];
const uniqueStops = [
    'Arrives at UDC',
    'Floral & Main',
    'Hillside',
    'ITC',
    'Leaves Mohawk',
    'Leaves Rafuse',
    'Leaves UDC',
    'Leaves Union',
    'Leroy & Murray',
    'Main & Murray',
    'Mohawk',
    'Parkway Plaza (Target)',
    'Returns to Campus',
    'Riverside & Columbus',
    'Town Square Mall (Walmart)',
    'UClub',
    'Washington & Lehigh'
];

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
                console.log(searchString)
                console.log(stopsAfterString);
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
