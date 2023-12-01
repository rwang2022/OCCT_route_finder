function getStopsAfterString(searchString) {
    try {
        const lines = [
            'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC',
            'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus',
            'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC',
            'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus',
            'Leaves Union, Arrives at UDC',
            'Leaves UDC, Main & Murray, Main & Floral, Pharmacy School, Returns to Campus',
            'Leaves Union, Pharmacy School, Main & Floral, Main & Murray, Arrives at UDC',
            'Leaves UDC, Arrives on Campus',
            'Leaves Union, Floral & Main, Leroy & Murray UClub (BY REQUEST), Returns to Campus',
            'Leaves Mohawk, ITC, UClub, Meadows & Hayes, Returns to Mohawk',
            'Leaves Mohawk, UClub, Washington & Lehigh',
            'Leaves Rafuse, Parkway Plaza, Town Square Mall (Walmart), Returns to Campus',
            'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus',
            'A lot, of places, on campus, sorry im lazy',
            'Leaves Union, Floral & Main, Main & Murray, Arrives at UDC',
            'Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus',
            'Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC',
            'Leaves UDC, Main & Murray, Floral & Main, Returns to Campus',
            'Leaves Union, Floral & Main, Leroy & Murray, UClub (BY REQUEST), Returns to Campus',
            'Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus',
            'Leaves Rafuse, Oakdale Commons, Wegmans, Returns to Campus',
            'Leaves Mohawk, UClub, Washington & Lehigh',
            'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus',
            'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus',
            'Leaves Union, UClub (Before 1 AM), Arrives Downtown, UClub (After 1 AM), Returns to Campus',
            'Leaves Union, Floral & Main, Main & Murray, State & Hawley',
            'Leaves Downtown, Leroy & Murray, Riverside & Columbus, Returns to Campus',
            'Leaves Union, Riverside & Columbus, Leroy & Murray, State & Hawley',
            'Leaves Downtown, Main & Murray, Floral & Main, Returns to Campus',
            'Leaves Mohawk, Susquehanna, Hillside, Mountainview, Returns to Lower Campus'
        ]

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

const searchString = 'Main & Murray';
const stopsArray = getStopsAfterString(searchString);
console.log(`Stops after "${searchString}":`, stopsArray);
