var lines = [
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
var uniqueStops = [
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
                console.log(searchString);
                console.log(stopsAfterString_1);
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
