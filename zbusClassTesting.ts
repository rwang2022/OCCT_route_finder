/**
 * pageNumber => ["WS", "Mon-Fri", "stop1, stop2, stop3", "1:00 2:00 3:000\n1:10 2:10 3:10\n..."]
 * @param pageNumber pageNumber of the bus you want
 * @returns a Promise<string[]> giving info of what is necessary
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

function constructBus() {
    const pageNumber: number = 1;
    constructBusAtPageNumber(pageNumber);
}

function constructBusAtPageNumber(pageNumber: number) {
    // Example usage
    fetchBus(1)
        .then(busInfo => {
            console.log(busInfo);
            const myBus: Bus = new Bus(busInfo[0], busInfo[1], busInfo[2].split(", "), busInfo.slice(3, undefined).map(timeLine => timeLine.split(" ")));
            
            const startStop = "Leaves Union";
            const endStop = "Floral & Main";
            const arrivalTime = "9:55PM";

            if (myBus.hasStartAndEndStop(startStop, endStop)) console.log("we have start and end stop\n");
            else console.log("we don't have start and end stop\n");
            
            if (myBus.weekdaysMatchToday()) console.log("weekdays match today\n");
            else console.log("weekdays don't match today\n");
            
            console.log("before adjustTimesAfterCurrentTime");
            console.log(myBus.times);
            console.log("after adjustTimesAfterCurrentTime");
            myBus.adjustTimesAfterCurrentTime(startStop);
            console.log(myBus.times);
            
            console.log("before adjustTimes_BeforeArrivalTime_AtEndStop");
            console.log(myBus.times);
            console.log("after adjustTimes_BeforeArrivalTime_AtEndStop");
            myBus.adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime, endStop);
            console.log(myBus.times);
        })
        .catch(error => {
            console.error(error);
        });
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

    adjustTimesAfterCurrentTime(startStop: string) {
        const startStopIndex = this.stops.indexOf(startStop);
        const currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "3:00PM"
        this.times = this.times.filter(time => this.differenceInMinutes(currentTime, time[startStopIndex]) <= 0);
    }

    adjustTimes_BeforeArrivalTime_AtEndStop(arrivalTime: string, endStop: string) {
        const endStopIndex = this.stops.indexOf(endStop);
        this.times = this.times.filter(time => this.differenceInMinutes(time[endStopIndex], arrivalTime) <= 0);
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