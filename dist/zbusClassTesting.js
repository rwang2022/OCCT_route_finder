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
    Bus.prototype.relevantToSearch = function (startStop, endStop, arrivalTime) {
        var stopsMatch = this.hasStartAndEndStop(startStop, endStop);
        var weekdayMatches = this.weekdaysMatchToday();
        this.adjustTimes_AfterCurrentTime_AtStartStop(startStop);
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
            return weekdayOfToday >= 1 && weekdayOfToday <= 5;
        else if (this.weekdays === 'Saturday & Sunday')
            return weekdayOfToday === 0 || weekdayOfToday === 6;
        else
            return false;
    };
    Bus.prototype.adjustTimes_AfterCurrentTime_AtStartStop = function (startStop) {
        var _this = this;
        var startStopIndex = this.stops.indexOf(startStop);
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "3:00PM"
        this.times = this.times.filter(function (time) {
            // TODO for now, we'll pass along times that are in the format "Mon-Fri8:00AM"
            return _this.differenceInMinutes(currentTime, time[startStopIndex]) <= 0 || _this.startsWithLetter(time[0]);
        });
    };
    Bus.prototype.adjustTimes_BeforeArrivalTime_AtEndStop = function (arrivalTime, endStop) {
        var _this = this;
        var endStopIndex = this.stops.indexOf(endStop);
        this.times = this.times.filter(function (time) {
            // TODO for now, we'll pass along times that are in the format "Mon-Fri8:00AM"
            return _this.differenceInMinutes(time[endStopIndex], arrivalTime) <= 0 || _this.startsWithLetter(time[0]);
        });
    };
    Bus.prototype.startsWithLetter = function (myString) {
        var first = myString[0];
        return (first >= 'a' && first <= 'z') || (first >= 'A' && first <= 'Z');
    };
    Bus.prototype.differenceInMinutes = function (time1, time2) {
        function parseTime(time) {
            var period = time.trim().slice(-2).toUpperCase();
            var timePart = time.slice(0, -2);
            var hours = parseInt(timePart.split(':')[0], 10);
            var minutes = parseInt(timePart.split(':')[1], 10);
            var periodValue = (period === 'PM') ? 1 : 0;
            return [hours, minutes, periodValue];
        }
        var _a = parseTime(time1), hours1 = _a[0], minutes1 = _a[1], period1 = _a[2];
        var _b = parseTime(time2), hours2 = _b[0], minutes2 = _b[1], period2 = _b[2];
        // Convert 12-hour format to 24-hour format
        var adjustedHours1 = (period1 === 1 && hours1 !== 12) ? (hours1 + 12) : hours1;
        var adjustedHours2 = (period2 === 1 && hours2 !== 12) ? (hours2 + 12) : hours2;
        // adjust for 12AM
        if (hours1 === 12 && period1 === 0)
            adjustedHours1 = 0;
        if (hours2 === 12 && period2 === 0)
            adjustedHours2 = 0;
        return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
    };
    return Bus;
}());
/**
 * pageNumber => ["WS", "Mon-Fri", "stop1, stop2, stop3", "1:00 2:00 3:000\n1:10 2:10 3:10\n..."]
 * @param pageNumber pageNumber of the bus you want
 * @returns array of all bus information
 */
function fetchBus(pageNumber) {
    return __awaiter(this, void 0, Promise, function () {
        var filePath, targetPage, response, fullFileText, busDataArray, startIndex_1, endIndex, filteredBusInfoArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = "full info.txt";
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
function constructBusAtPageNumber(pageNumber, startStop, endStop, arrivalTime) {
    fetchBus(pageNumber)
        .then(function (busInfo) {
        var myBus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(function (timeLine) { return timeLine.split(" "); }));
        // setting booleans for our filters
        if (myBus.relevantToSearch(startStop, endStop, arrivalTime)) {
            myBus.print();
            createTable(myBus);
        }
    })["catch"](function (error) {
        // TODO not good error checking, fix when you have time
        // console.error(error);
    });
}
function constructBus() {
    // our filters
    // const startStop = "Leaves Union";
    // const endStop = "Floral & Main";
    // const arrivalTime = "9:55PM";
    var startStop = document.getElementById('chosenStart').value;
    var endStop = document.getElementById('chosenEnd').value;
    var arrivalTime = document.getElementById("userPreferredTime").value;
    var NUM_PAGES = 30;
    for (var pageNumber = 1; pageNumber <= NUM_PAGES; pageNumber++) {
        constructBusAtPageNumber(pageNumber, startStop, endStop, arrivalTime);
    }
}
function createTable(myBus) {
    var output = document.getElementById("output");
    var table = document.createElement('table');
    // HEADER - bus stops
    var headerData = myBus.stops;
    var header = table.createTHead();
    var headerRow = header.insertRow();
    headerData.forEach(function (headerInfo) {
        var th = document.createElement('th');
        th.textContent = headerInfo;
        headerRow.appendChild(th);
    });
    // BODY - bus times
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
    output.appendChild(table);
}
