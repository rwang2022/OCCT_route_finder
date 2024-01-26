var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bus = /** @class */ (function () {
    function Bus(name, weekdays, stops, times) {
        this.name = name;
        this.weekdays = weekdays;
        this.stops = stops;
        this.times = times;
    }
    Bus.prototype.relevantToSearch = function (startStop, endStop, departingTime, arrivalTime) {
        var stopsMatch = this.hasStartAndEndStop(startStop, endStop);
        var weekdayMatches = this.weekdaysMatchToday();
        this.adjustTimes_AfterDepartingTime_AtStartStop(departingTime, startStop);
        this.adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime, endStop);
        var hasMatchingTimes = this.times.length > 0;
        return (stopsMatch && weekdayMatches && hasMatchingTimes);
    };
    Bus.prototype.print = function () {
        console.log(this.name + "\n");
        console.log(this.weekdays + "\n");
        console.log(this.stops + "\n");
        console.log(this.times);
    };
    Bus.prototype.hasStartAndEndStop = function (startStop, endStop) {
        var startStopIndex = this.stops.indexOf(startStop);
        var endStopIndex = this.stops.indexOf(endStop);
        return (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex);
    };
    Bus.prototype.weekdaysMatchToday = function () {
        var weekdayOfToday = new Date().getDay();
        if (this.weekdays === 'Mon-Fri')
            return 1 /* MONDAY */ <= weekdayOfToday && weekdayOfToday <= 5 /* FRIDAY */;
        else if (this.weekdays === 'Saturday & Sunday')
            return weekdayOfToday === 6 /* SATURDAY */ || weekdayOfToday === 0 /* SUNDAY */;
        else
            return false;
    };
    Bus.prototype.adjustTimes_AfterDepartingTime_AtStartStop = function (departingTime, startStop) {
        var _this = this;
        var startStopIndex = this.stops.indexOf(startStop);
        if (departingTime == "now") {
            departingTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        this.times = this.times.filter(function (time) {
            var startTime = time[startStopIndex];
            var timePart = _this.getTimePart(startTime);
            var weekdaysPart = _this.getWeekdaysPart(startTime);
            var timesMatch = _this.differenceInMinutes(departingTime, timePart) <= 0;
            var weekdaysMatch = _this.busWeekdayMatchesToday(weekdaysPart);
            // if (weekdaysPart !== "" && (timesMatch && weekdaysMatch)) console.log(
            //     departingTime + " - " + timePart + " = " + this.differenceInMinutes(departingTime, timePart) + 
            //     "\ntimePart:" + timePart + " weekdaysPart:" + weekdaysPart + 
            // "\ntimesMatch:" + timesMatch + " weekdaysMatch:" + weekdaysMatch);
            return timesMatch && weekdaysMatch;
        });
    };
    Bus.prototype.adjustTimes_BeforeArrivalTime_AtEndStop = function (arrivalTime, endStop) {
        var _this = this;
        var endStopIndex = this.stops.indexOf(endStop);
        this.times = this.times.filter(function (time) {
            var startTime = time[endStopIndex];
            var timePart = _this.getTimePart(startTime);
            var weekdaysPart = _this.getWeekdaysPart(startTime);
            var timesMatch = _this.differenceInMinutes(timePart, arrivalTime) <= 0;
            var weekdaysMatch = _this.busWeekdayMatchesToday(weekdaysPart);
            return (timesMatch && weekdaysMatch);
        });
    };
    /**
     * ! untested: may not work
     * @param time a string like "8:00AM" or "Mon-Fri8:00AM"
     * @returns a breakdown [timePart: string, weekdaysArray: Days[]]
     */
    Bus.prototype.getTimePart = function (time) {
        time = time.trim();
        var timePart = time.slice(this.findFirstNumberIndex(time), undefined);
        return timePart;
    };
    Bus.prototype.getWeekdaysPart = function (time) {
        var weekdaysPart = time.slice(0, this.findFirstNumberIndex(time));
        return weekdaysPart;
    };
    // weekdayStr is "Mon-Thu", "Fri", "Sat", "Sun"
    Bus.prototype.busWeekdayMatchesToday = function (weekdayStr) {
        var weekdayOfToday = new Date().getDay();
        var matches = true; // we want to over-display bus times, so we begin by assuming they match 
        switch (weekdayStr) {
            case "Mon-Thu":
                matches = (1 /* MONDAY */ <= weekdayOfToday) && (weekdayOfToday <= 4 /* THURSDAY */);
                break;
            case "Fri":
                matches = (weekdayOfToday == 5 /* FRIDAY */);
                break;
            case "Sat":
                matches = (weekdayOfToday == 6 /* SATURDAY */);
                break;
            case "Sun":
                matches = (weekdayOfToday == 0 /* SUNDAY */);
                break;
            default:
                break;
        }
        return matches;
    };
    Bus.prototype.findFirstNumberIndex = function (inputString) {
        for (var i = 0; i < inputString.length; i++) {
            if (/\d/.test(inputString[i])) {
                return i;
            }
        }
        return undefined; // Return null if no number is found
    };
    Bus.prototype.differenceInMinutes = function (time1, time2) {
        /**
         * hours are out of 24
         * @param time string like "12:00AM"
         * @returns [hours, minutes]
         */
        function parseTime(time) {
            time.trim();
            var timePart = time.slice(0, -2);
            var period = time.slice(-2).toUpperCase();
            var hours = parseInt(timePart.split(':')[0], 10);
            var minutes = parseInt(timePart.split(':')[1], 10);
            if (hours === 12 && period === 'AM')
                hours = 0;
            if (hours !== 12 && period === 'PM')
                hours += 12;
            return [hours, minutes];
        }
        var _a = parseTime(time1), hours1 = _a[0], minutes1 = _a[1];
        var _b = parseTime(time2), hours2 = _b[0], minutes2 = _b[1];
        return (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
    };
    return Bus;
}());
/**
 * pageNumber => ["WS", "Mon-Fri", "stop1, stop2, stop3", "1:00 2:00 3:000\n1:10 2:10 3:10\n..."]
 * @param pageNumber pageNumber of the bus you want
 * @returns array of all bus information
 */
function fetchBusAtPageNumber(pageNumber) {
    return __awaiter(this, void 0, Promise, function () {
        var filePath, targetPage, response, fullFileText, busDataArray, startIndex_1, endIndex, filteredBusInfoArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = "/static/full_info_spring2024.txt";
                    targetPage = "PAGE " + pageNumber;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(filePath)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error loading " + filePath + ": " + response.status + " " + response.statusText);
                    }
                    return [4 /*yield*/, response.text()];
                case 3:
                    fullFileText = _a.sent();
                    busDataArray = fullFileText.split('\n');
                    startIndex_1 = busDataArray.findIndex(function (line) { return line.includes(targetPage); });
                    if (startIndex_1 === -1) {
                        throw new Error("Page " + pageNumber + " not found");
                    }
                    endIndex = busDataArray.findIndex(function (line, index) { return index > startIndex_1 && line.includes("PAGE " + (pageNumber + 1)); });
                    filteredBusInfoArray = busDataArray
                        .slice(startIndex_1 + 1, endIndex !== -1 ? endIndex : undefined)
                        .filter(function (lineData) { return lineData.trim() !== ""; }) // filter out empty lines
                        .map(function (lineData) { return lineData.trim(); });
                    return [2 /*return*/, filteredBusInfoArray];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createTableForBus(myBus, pageNumber, startStop, endStop) {
    var output = document.getElementById("output");
    var busDiv = document.createElement('div');
    var table = document.createElement('table');
    // BUS DESCRIPTION - number, name, weekdays
    var h2 = document.createElement('h2');
    h2.textContent = "#" + pageNumber + " " + myBus.name + " " + myBus.weekdays;
    busDiv.appendChild(h2);
    // TABLE HEADER - bus stops list
    var headerData = myBus.stops;
    var header = table.createTHead();
    var headerRow = header.insertRow();
    headerData.forEach(function (headerInfo) {
        var th = document.createElement('th');
        th.textContent = headerInfo;
        if (th.textContent == startStop || th.textContent == endStop) {
            th.style.background = 'linear-gradient(135deg, #1a2533, #1f618d)';
        }
        headerRow.appendChild(th);
    });
    // BODY - bus times - 2D list 
    var tableData = myBus.times;
    var row = {};
    var cell = {};
    tableData.forEach(function (rowData) {
        row = table.insertRow(-1); // [-1] for last position in Safari
        rowData.forEach(function (cellData) {
            cell = row.insertCell();
            cell.textContent = cellData;
        });
    });
    // actually attaching it
    busDiv.appendChild(table);
    output === null || output === void 0 ? void 0 : output.appendChild(busDiv);
}
function displayAllRelevantBuses() {
    return __awaiter(this, void 0, void 0, function () {
        var startStop, endStop, departingTime, arrivalTime, NUM_PAGES;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startStop = document.getElementById('chosenStart').value;
                    endStop = document.getElementById('chosenEnd').value;
                    departingTime = document.getElementById("departingTime").value;
                    arrivalTime = document.getElementById("arrivalTime").value;
                    console.clear();
                    document.getElementById("output").innerHTML = "";
                    NUM_PAGES = 30;
                    // Use Promise.all to wait for all displayBusAtPageNumber_ifRelevant calls to complete
                    return [4 /*yield*/, Promise.all(Array.from({ length: NUM_PAGES }, function (_, i) {
                            return displayBusAtPageNumber_ifRelevant(i + 1, startStop, endStop, departingTime, arrivalTime);
                        }))];
                case 1:
                    // Use Promise.all to wait for all displayBusAtPageNumber_ifRelevant calls to complete
                    _a.sent();
                    scrollToBottom();
                    return [2 /*return*/];
            }
        });
    });
}
function displayBusAtPageNumber_ifRelevant(pageNumber, startStop, endStop, departingTime, arrivalTime) {
    return __awaiter(this, void 0, void 0, function () {
        var busInfo, myBus, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchBusAtPageNumber(pageNumber)];
                case 1:
                    busInfo = _a.sent();
                    myBus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(function (timeLine) { return timeLine.split(" "); }));
                    if (myBus.relevantToSearch(startStop, endStop, departingTime, arrivalTime)) {
                        myBus.print();
                        createTableForBus(myBus, pageNumber, startStop, endStop);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to scroll to the bottom of the page
function scrollToBottom() {
    var output = document.getElementById("output");
    output.innerHTML.trim();
    if (output.innerHTML === '')
        output.innerHTML = "<p style=\"font-size: 30px; padding: 5rem;\">No buses, change times.</p>";
    console.log("hello");
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function doesNothing() {
}
function doesNothing2() {
}
