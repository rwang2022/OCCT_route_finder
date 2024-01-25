const enum Days {
    SUNDAY = 0,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

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

    relevantToSearch(startStop: string, endStop: string, departingTime: string, arrivalTime: string) {
        const stopsMatch: boolean = this.hasStartAndEndStop(startStop, endStop);
        const weekdayMatches: boolean = this.weekdaysMatchToday();
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

    hasStartAndEndStop(startStop: string, endStop: string) {
        const startStopIndex = this.stops.indexOf(startStop);
        const endStopIndex = this.stops.indexOf(endStop);
        return (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex);
    }

    weekdaysMatchToday() {
        const weekdayOfToday = new Date().getDay();
        if (this.weekdays === 'Mon-Fri') return Days.MONDAY <= weekdayOfToday && weekdayOfToday <= Days.FRIDAY;
        else if (this.weekdays === 'Saturday & Sunday') return weekdayOfToday === Days.SATURDAY || weekdayOfToday === Days.SUNDAY;
        else return false;
    }

    adjustTimes_AfterDepartingTime_AtStartStop(departingTime: string, startStop: string) {
        const startStopIndex = this.stops.indexOf(startStop);
        if (departingTime == "now") { departingTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

        this.times = this.times.filter(time => {
            const startTime = time[startStopIndex];
            const timePart = this.getTimePart(startTime);
            const weekdaysPart = this.getWeekdaysPart(startTime);

            const timesMatch: boolean = this.differenceInMinutes(departingTime, timePart) <= 0;
            const weekdaysMatch: boolean = this.busWeekdayMatchesToday(weekdaysPart);

            // if (weekdaysPart !== "" && (timesMatch && weekdaysMatch)) console.log(
            //     departingTime + " - " + timePart + " = " + this.differenceInMinutes(departingTime, timePart) + 
            //     "\ntimePart:" + timePart + " weekdaysPart:" + weekdaysPart + 
            // "\ntimesMatch:" + timesMatch + " weekdaysMatch:" + weekdaysMatch);

            return timesMatch && weekdaysMatch;
        });
    }

    adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime: string, endStop: string) {
        const endStopIndex = this.stops.indexOf(endStop);

        this.times = this.times.filter(time => {
            const startTime = time[endStopIndex];
            const timePart = this.getTimePart(startTime);
            const weekdaysPart = this.getWeekdaysPart(startTime);

            const timesMatch: boolean = this.differenceInMinutes(timePart, arrivalTime) <= 0;
            const weekdaysMatch: boolean = this.busWeekdayMatchesToday(weekdaysPart);

            return (timesMatch && weekdaysMatch);
        });
    }

    /**
     * ! untested: may not work
     * @param time a string like "8:00AM" or "Mon-Fri8:00AM"
     * @returns a breakdown [timePart: string, weekdaysArray: Days[]]
     */
    private getTimePart(time: string): string {
        time = time.trim();
        const timePart: string = time.slice(this.findFirstNumberIndex(time), undefined);
        return timePart;
    }

    getWeekdaysPart(time: string): string {
        const weekdaysPart: string = time.slice(0, this.findFirstNumberIndex(time));
        return weekdaysPart;
    }

    // weekdayStr is "Mon-Thu", "Fri", "Sat", "Sun"
    busWeekdayMatchesToday(weekdayStr: string): boolean {
        const weekdayOfToday = new Date().getDay();
        let matches: boolean = true; // we want to over-display bus times, so we begin by assuming they match 

        switch (weekdayStr) {
            case "Mon-Thu":
                matches = (Days.MONDAY <= weekdayOfToday) && (weekdayOfToday <= Days.THURSDAY);
                break;
            case "Fri":
                matches = (weekdayOfToday == Days.FRIDAY);
                break;
            case "Sat":
                matches = (weekdayOfToday == Days.SATURDAY);
                break;
            case "Sun":
                matches = (weekdayOfToday == Days.SUNDAY);
                break;
            default:
                break;
        }

        return matches;
    }

    private findFirstNumberIndex(inputString: string): number | undefined {
        for (let i = 0; i < inputString.length; i++) {
            if (/\d/.test(inputString[i])) {
                return i;
            }
        }
        return undefined; // Return null if no number is found
    }

    private differenceInMinutes(time1: string, time2: string) {
        /**
         * hours are out of 24
         * @param time string like "12:00AM"
         * @returns [hours, minutes]
         */
        function parseTime(time: string) {
            time.trim();

            const timePart = time.slice(0, -2);
            const period = time.slice(-2).toUpperCase();

            let hours = parseInt(timePart.split(':')[0], 10);
            const minutes = parseInt(timePart.split(':')[1], 10);

            if (hours === 12 && period === 'AM') hours = 0;
            if (hours !== 12 && period === 'PM') hours += 12;

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
async function fetchBusAtPageNumber(pageNumber: number): Promise<string[]> {
    // const filePath = "full_info.txt";
    const filePath = "/static/full_info_spring2024.txt";
    const targetPage = `PAGE ${pageNumber}`;

    try {
        const response = await fetch(filePath);

        if (!response.ok) { throw new Error(`Error loading ${filePath}: ${response.status} ${response.statusText}`); }

        const fullFileText = await response.text();
        const busDataArray = fullFileText.split('\n');
        const startIndex = busDataArray.findIndex(line => line.includes(targetPage));

        if (startIndex === -1) { throw new Error(`Page ${pageNumber} not found`); }

        const endIndex = busDataArray.findIndex((line, index) => index > startIndex && line.includes(`PAGE ${pageNumber + 1}`));

        // string[] of lines for the bus at pageNumber
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

function createTableForBus(myBus: Bus, pageNumber: number, startStop, endStop) {
    var output = document.getElementById("output");
    const busDiv = document.createElement('div');
    var table = document.createElement('table');

    // BUS DESCRIPTION - number, name, weekdays
    const h2 = document.createElement('h2');
    h2.textContent = "#" + pageNumber + " " + myBus.name + " " + myBus.weekdays;
    busDiv.appendChild(h2);

    // TABLE HEADER - bus stops list
    const headerData: string[] = myBus.stops;
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
            cell = (row as HTMLTableRowElement).insertCell();
            (cell as HTMLTableCellElement).textContent = cellData;
        });
    });

    // actually attaching it
    busDiv.appendChild(table);
    output?.appendChild(busDiv);
}

async function displayAllRelevantBuses() {
    const startStop = (document.getElementById('chosenStart') as HTMLInputElement).value;
    const endStop = (document.getElementById('chosenEnd') as HTMLInputElement).value;
    const departingTime = (document.getElementById("departingTime") as HTMLInputElement).value;
    const arrivalTime = (document.getElementById("arrivalTime") as HTMLInputElement).value;

    console.clear();
    (document.getElementById("output") as HTMLElement).innerHTML = "";

    const NUM_PAGES = 30;

    // Use Promise.all to wait for all displayBusAtPageNumber_ifRelevant calls to complete
    await Promise.all(Array.from({ length: NUM_PAGES }, (_, i) =>
        displayBusAtPageNumber_ifRelevant(i + 1, startStop, endStop, departingTime, arrivalTime)
    ));

    scrollToBottom();
}

async function displayBusAtPageNumber_ifRelevant(pageNumber: number, startStop, endStop, departingTime, arrivalTime) {
    try {
        const busInfo = await fetchBusAtPageNumber(pageNumber);
        const myBus: Bus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(timeLine => timeLine.split(" ")));

        if (myBus.relevantToSearch(startStop, endStop, departingTime, arrivalTime)) {
            myBus.print();
            createTableForBus(myBus, pageNumber, startStop, endStop);
        }
    } catch (error) {
        // TODO Handle errors appropriately
        // console.error(error);
    }
}

// Function to scroll to the bottom of the page
function scrollToBottom() {
    const output = document.getElementById("output") as HTMLElement;
    output.innerHTML.trim();
    
    if (output.innerHTML === '') output.innerHTML = "<p style=\"font-size: 30px; padding: 5rem;\">No buses, change times.</p>";
    console.log("hello");
    
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function doesNothing() {
}

function doesNothing2() {
}