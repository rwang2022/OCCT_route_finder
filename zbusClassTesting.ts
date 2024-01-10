class Bus {
    name: string;
    weekdays: string;
    stops: string[];
    times: string[][];

    constructor(name: string, weekdays: string, stops: string[], times: string[][]) {
        this.name = name;
        this.weekdays = weekdays;
        this.stops = stops;
        this.times = times;
    }

    relevantToSearch(startStop: string, endStop: string, arrivalTime: string) {
        const stopsMatch: boolean = this.hasStartAndEndStop(startStop, endStop);
        const weekdayMatches: boolean = this.weekdaysMatchToday();
        this.adjustTimes_AfterCurrentTime_AtStartStop(startStop);
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

    hasStartAndEndStop(startStop: string, endStop: string) {
        const startStopIndex = this.stops.indexOf(startStop);
        const endStopIndex = this.stops.indexOf(endStop);
        return (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex);
    }

    weekdaysMatchToday() {
        const weekdayOfToday = new Date().getDay();
        if (this.weekdays === 'Mon-Fri') return weekdayOfToday >= 1 && weekdayOfToday <= 5;
        else if (this.weekdays === 'Saturday & Sunday') return weekdayOfToday === 0 || weekdayOfToday === 6;
        else return false;
    }

    adjustTimes_AfterCurrentTime_AtStartStop(startStop: string) {
        const startStopIndex = this.stops.indexOf(startStop);
        const currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "3:00PM"
        this.times = this.times.filter(time =>
            // TODO for now, we'll pass along times that are in the format "Mon-Fri8:00AM"
            this.differenceInMinutes(currentTime, time[startStopIndex]) <= 0 || this.startsWithLetter(time[0]));
    }

    adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime: string, endStop: string) {
        const endStopIndex = this.stops.indexOf(endStop);
        this.times = this.times.filter(time =>
            // TODO for now, we'll pass along times that are in the format "Mon-Fri8:00AM"
            this.differenceInMinutes(time[endStopIndex], arrivalTime) <= 0 || this.startsWithLetter(time[0]));
    }

    private startsWithLetter(myString: string) {
        const first = myString[0];
        return (first >= 'a' && first <= 'z') || (first >= 'A' && first <= 'Z');
    }

    private differenceInMinutes(time1: string, time2: string) {
        function parseTime(time: string) {
            const period = time.trim().slice(-2).toUpperCase();
            const timePart = time.slice(0, -2);
            const hours = parseInt(timePart.split(':')[0], 10);
            const minutes = parseInt(timePart.split(':')[1], 10);
            const periodValue = (period === 'PM') ? 1 : 0;

            return [hours, minutes, periodValue];
        }

        const [hours1, minutes1, period1] = parseTime(time1);
        const [hours2, minutes2, period2] = parseTime(time2);

        // Convert 12-hour format to 24-hour format
        let adjustedHours1 = (period1 === 1 && hours1 !== 12) ? (hours1 + 12) : hours1;
        let adjustedHours2 = (period2 === 1 && hours2 !== 12) ? (hours2 + 12) : hours2;

        // adjust for 12AM
        if (hours1 === 12 && period1 === 0) adjustedHours1 = 0;
        if (hours2 === 12 && period2 === 0) adjustedHours2 = 0;

        return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
    }
}


/**
 * pageNumber => ["WS", "Mon-Fri", "stop1, stop2, stop3", "1:00 2:00 3:000\n1:10 2:10 3:10\n..."]
 * @param pageNumber pageNumber of the bus you want
 * @returns array of all bus information
 */
async function fetchBus(pageNumber: number): Promise<string[]> {
    const filePath = "full info.txt";
    const targetPage = `PAGE ${pageNumber}`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error loading ${filePath}: ${response.status} ${response.statusText}`);
        }

        const fullFileText = await response.text();
        const busDataArray = fullFileText.split('\n');
        const startIndex = busDataArray.findIndex(line => line.includes(targetPage));

        if (startIndex === -1) {
            throw new Error(`Page ${pageNumber} not found`);
        }

        const endIndex = busDataArray.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));

        // Filter out empty lines
        const filteredBusInfoArray = busDataArray
            .slice(startIndex + 1, endIndex !== -1 ? endIndex : undefined)
            .filter(lineData => lineData.trim() !== "") // filter out empty lines
            .map(lineData => lineData.trim()); // remove whitespace at ends

        return filteredBusInfoArray;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


function constructBusAtPageNumber(pageNumber: number, startStop, endStop, arrivalTime) {
    fetchBus(pageNumber)
        .then(busInfo => {
            const myBus: Bus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(timeLine => timeLine.split(" ")));

            // setting booleans for our filters
            if (myBus.relevantToSearch(startStop, endStop, arrivalTime)) {
                myBus.print();
                const my_2D_array = myBus.times;
                createTable(my_2D_array);
            }
        })
        .catch(error => {
            // TODO not good error checking, fix when you have time
            // console.error(error);
        });
}

function constructBus() {
    // our filters
    const startStop = "Leaves Union";
    const endStop = "Floral & Main";
    const arrivalTime = "9:55PM";

    const NUM_PAGES = 30;
    for (let pageNumber = 1; pageNumber <= NUM_PAGES; pageNumber++) {
        constructBusAtPageNumber(pageNumber, startStop, endStop, arrivalTime);
    }
}

function createTable(tableData: string[][]) {
    var table = document.createElement('table');
    var row = {};
    var cell = {};

    tableData.forEach(function (rowData) {
        row = table.insertRow(-1); // [-1] for last position in Safari
        rowData.forEach(function (cellData) {
            cell = row.insertCell();
            cell.textContent = cellData;
        });
    });
    document.body.appendChild(table);
}
