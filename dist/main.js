"use strict";
exports.__esModule = true;
var summer2024_helper_1 = require("./summer2024_helper");
//* populate the start and destination stops dropdown
document.addEventListener('DOMContentLoaded', function () {
    // START stop
    var busStopsDropdown = document.getElementById('busStops');
    // Populate possible START stops
    summer2024_helper_1.uniqueStops.forEach(function (stop) {
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
                for (var _i = 0, lines_1 = summer2024_helper_1.lines; _i < lines_1.length; _i++) {
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
