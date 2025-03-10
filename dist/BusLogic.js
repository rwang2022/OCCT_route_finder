var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Bus {
    constructor(name, weekdays, stops, times) {
        this.name = name;
        this.weekdays = weekdays;
        this.stops = stops;
        this.times = times;
    }
    relevantToSearch(startStop, endStop, departingTime, arrivalTime) {
        const stopsMatch = this.hasStartAndEndStop(startStop, endStop);
        const weekdayMatches = this.weekdaysMatchToday();
        this.adjustTimes_AfterDepartingTime_AtStartStop(departingTime, startStop);
        this.adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime, endStop);
        const hasMatchingTimes = this.times.length > 0;
        return (stopsMatch && weekdayMatches && hasMatchingTimes);
    }
    print() {
        console.log(this.name + "\n");
        console.log(this.weekdays + "\n");
        console.log(this.stops + "\n");
        console.log(this.times);
    }
    hasStartAndEndStop(startStop, endStop) {
        const startStopIndex = this.stops.indexOf(startStop);
        const endStopIndex = this.stops.indexOf(endStop);
        return (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex);
    }
    weekdaysMatchToday() {
        const weekdayOfToday = new Date().getDay();
        if (this.weekdays === 'Mon-Fri')
            return 1 /* Days.MONDAY */ <= weekdayOfToday && weekdayOfToday <= 5 /* Days.FRIDAY */;
        else if (this.weekdays === 'Saturday & Sunday')
            return weekdayOfToday === 6 /* Days.SATURDAY */ || weekdayOfToday === 0 /* Days.SUNDAY */;
        else if (this.weekdays === 'Friday')
            return weekdayOfToday === 5;
        else if (this.weekdays === 'Friday & Saturday')
            return weekdayOfToday === 5 || weekdayOfToday === 6;
        else
            return false;
    }
    adjustTimes_AfterDepartingTime_AtStartStop(departingTime, startStop) {
        const startStopIndex = this.stops.indexOf(startStop);
        if (departingTime == "now") {
            departingTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        this.times = this.times.filter(time => {
            const startTime = time[startStopIndex];
            const timePart = this.getTimePart(startTime);
            const weekdaysPart = this.getWeekdaysPart(startTime);
            const timesMatch = this.differenceInMinutes(departingTime, timePart) <= 0;
            const weekdaysMatch = this.busWeekdayMatchesToday(weekdaysPart);
            // if (weekdaysPart !== "" && (timesMatch && weekdaysMatch)) console.log(
            //     departingTime + " - " + timePart + " = " + this.differenceInMinutes(departingTime, timePart) + 
            //     "\ntimePart:" + timePart + " weekdaysPart:" + weekdaysPart + 
            // "\ntimesMatch:" + timesMatch + " weekdaysMatch:" + weekdaysMatch);
            return timesMatch && weekdaysMatch;
        });
    }
    adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime, endStop) {
        const endStopIndex = this.stops.indexOf(endStop);
        this.times = this.times.filter(time => {
            const startTime = time[endStopIndex];
            const timePart = this.getTimePart(startTime);
            const weekdaysPart = this.getWeekdaysPart(startTime);
            const timesMatch = this.differenceInMinutes(timePart, arrivalTime) <= 0;
            const weekdaysMatch = this.busWeekdayMatchesToday(weekdaysPart);
            return (timesMatch && weekdaysMatch);
        });
    }
    /**
     * ! untested: may not work
     * @param time a string like "8:00AM" or "Mon-Fri8:00AM"
     * @returns a breakdown [timePart: string, weekdaysArray: Days[]]
     */
    getTimePart(time) {
        time = time.trim();
        const timePart = time.slice(this.findFirstNumberIndex(time), undefined);
        return timePart;
    }
    getWeekdaysPart(time) {
        const weekdaysPart = time.slice(0, this.findFirstNumberIndex(time));
        return weekdaysPart;
    }
    // weekdayStr is "Mon-Thu", "Fri", "Sat", "Sun"
    busWeekdayMatchesToday(weekdayStr) {
        const weekdayOfToday = new Date().getDay();
        let matches = true; // we want to over-display bus times, so we begin by assuming they match 
        switch (weekdayStr) {
            case "Mon-Thu":
                matches = (1 /* Days.MONDAY */ <= weekdayOfToday) && (weekdayOfToday <= 4 /* Days.THURSDAY */);
                break;
            case "Fri":
                matches = (weekdayOfToday == 5 /* Days.FRIDAY */);
                break;
            case "Sat":
                matches = (weekdayOfToday == 6 /* Days.SATURDAY */);
                break;
            case "Sun":
                matches = (weekdayOfToday == 0 /* Days.SUNDAY */);
                break;
            default:
                break;
        }
        return matches;
    }
    findFirstNumberIndex(inputString) {
        for (let i = 0; i < inputString.length; i++) {
            if (/\d/.test(inputString[i])) {
                return i;
            }
        }
        return undefined; // Return null if no number is found
    }
    differenceInMinutes(time1, time2) {
        /**
         * hours are out of 24
         * @param time string like "12:00AM"
         * @returns [hours, minutes]
         */
        function parseTime(time) {
            time.trim();
            const timePart = time.slice(0, -2);
            const period = time.slice(-2).toUpperCase();
            let hours = parseInt(timePart.split(':')[0], 10);
            const minutes = parseInt(timePart.split(':')[1], 10);
            if (hours === 12 && period === 'AM')
                hours = 0;
            if (hours !== 12 && period === 'PM')
                hours += 12;
            return [hours, minutes];
        }
        const [hours1, minutes1] = parseTime(time1);
        const [hours2, minutes2] = parseTime(time2);
        return (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
    }
}
/**
 * pageNumber => ["WS", "Mon-Fri", "stop1, stop2, stop3", "1:00 2:00 3:000\n1:10 2:10 3:10\n..."]
 * @param pageNumber pageNumber of the bus you want
 * @returns array of all bus information
 */
function fetchBusAtPageNumber(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        // const filePath = "full_info.txt";
        const filePath = "/static/spring2025.txt";
        const targetPage = `PAGE ${pageNumber}`;
        try {
            const response = yield fetch(filePath);
            if (!response.ok) {
                throw new Error(`Error loading ${filePath}: ${response.status} ${response.statusText}`);
            }
            const fullFileText = yield response.text();
            const busDataArray = fullFileText.split('\n');
            const startIndex = busDataArray.findIndex(line => line.includes(targetPage));
            if (startIndex === -1) {
                throw new Error(`Page ${pageNumber} not found, the times might be too narrow`);
            }
            const endIndex = busDataArray.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));
            // string[] of lines for the bus at pageNumber
            const filteredBusInfoArray = busDataArray
                .slice(startIndex + 1, endIndex !== -1 ? endIndex : undefined)
                .filter(lineData => lineData.trim() !== "") // filter out empty lines
                .map(lineData => lineData.trim()); // remove whitespace at ends
            return filteredBusInfoArray;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
function createTableForBus(myBus, pageNumber, startStop, endStop) {
    var output = document.getElementById("output");
    const busDiv = document.createElement('div');
    var table = document.createElement('table');
    // BUS DESCRIPTION - number, name, weekdays
    const h2 = document.createElement('h2');
    h2.textContent = "#" + pageNumber + " " + myBus.name + " " + myBus.weekdays;
    busDiv.appendChild(h2);
    // TABLE HEADER - bus stops list
    const headerData = myBus.stops;
    var header = table.createTHead();
    var headerRow = header.insertRow();
    headerData.forEach(headerInfo => {
        const th = document.createElement('th');
        th.textContent = headerInfo;
        if (th.textContent == startStop || th.textContent == endStop) {
            th.style.background = 'linear-gradient(135deg, #1a2533, #1f618d)';
        }
        headerRow.appendChild(th);
    });
    // BODY - bus times - 2D list 
    const tableData = myBus.times;
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
    return __awaiter(this, void 0, void 0, function* () {
        var Start = new Date().getTime();
        const startStop = document.getElementById('chosenStart').value;
        const endStop = document.getElementById('chosenEnd').value;
        const departingTime = document.getElementById("departingTime").value;
        const arrivalTime = document.getElementById("arrivalTime").value;
        console.clear();
        document.getElementById("output").innerHTML = "";
        const NUM_PAGES = 30;
        // Use Promise.all to wait for all displayBusAtPageNumber_ifRelevant calls to complete
        yield Promise.all(Array.from({ length: NUM_PAGES }, (_, i) => displayBusAtPageNumber_ifRelevant(i + 1, startStop, endStop, departingTime, arrivalTime)));
        scrollToBottom();
        var End = new Date().getTime();
        var timeTook = End - Start;
        console.log("that took " + timeTook + " ms");
    });
}
function displayBusAtPageNumber_ifRelevant(pageNumber, startStop, endStop, departingTime, arrivalTime) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const busInfo = yield fetchBusAtPageNumber(pageNumber);
            const myBus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(timeLine => timeLine.split(" ")));
            if (myBus.relevantToSearch(startStop, endStop, departingTime, arrivalTime)) {
                myBus.print();
                createTableForBus(myBus, pageNumber, startStop, endStop);
            }
        }
        catch (error) {
            // TODO Handle errors appropriately
            // console.error(error);
        }
    });
}
// Function to scroll to the bottom of the page
function scrollToBottom() {
    const output = document.getElementById("output");
    output.innerHTML.trim();
    if (output.innerHTML === '')
        output.innerHTML = "<p style=\"font-size: 30px; padding: 5rem;\">No buses, change times.</p>";
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function doesNothing() {
}
function doesNothing2() {
}
function doesNothing3() { }
