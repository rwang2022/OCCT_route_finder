// helper function for compareTimes. takes in 1:23PM, returns [1,23,'PM']
function parseTime(time) {
    const period = time.slice(-2).toUpperCase();
    const timePart = time.slice(0, -2);
    const hours = parseInt(timePart.split(':')[0], 10);
    const minutes = parseInt(timePart.split(':')[1], 10);

    // console.log("parseTime: " + [hours, minutes, period]);
    return [hours, minutes, period];
}

// takes in 1:23PM, 2:34AM => parseTime. returns time1 - time2, takes into account AM/PM
function compareTimes(time1, time2) {
    const [hours1, minutes1, period1] = parseTime(time1);
    const [hours2, minutes2, period2] = parseTime(time2);

    // Convert 12-hour format to 24-hour format
    const adjustedHours1 = (period1 === 'PM' && hours1 !== 12) ? (hours1 + 12) : hours1;
    const adjustedHours2 = (period2 === 'PM' && hours2 !== 12) ? (hours2 + 12) : hours2;

    return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
}

const time1 = "1:30PM";
const time2 = "8:30PM";
console.log(compareTimes(time1, time2));