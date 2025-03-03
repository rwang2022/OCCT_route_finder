import noUiSlider from '/nouislider/dist/nouislider.mjs';

var format = {
    to: function (minutesAfterMidnight) {
        minutesAfterMidnight = Math.round(minutesAfterMidnight);
        const hours = Math.floor(minutesAfterMidnight / 60);
        const minutes = (minutesAfterMidnight % 60);
        const meridiem = hours < 12 ? "AM" : "PM";
        const formattedHours = hours % 12 || 12;
        const timeString = `${String(formattedHours)}:${String(minutes).padStart(2, '0')}${meridiem}`;
        return timeString;
    },
    from: function (timeStr) {
        timeStr = timeStr.trim();
        var time = timeStr.slice(0, -2);
        var meridiem = timeStr.slice(-2, undefined);
        var [hoursStr, minutesStr] = time.split(":");
        let hours = parseInt(hoursStr, 10);
        let minutes = parseInt(minutesStr, 10);
        if (meridiem === "PM" && hours !== 12) {
            hours += 12;
        } else if (meridiem === "AM" && hours === 12) {
            hours = 0;
        }
        var minutesAfterMidnight = hours * 60 + minutes;
        return minutesAfterMidnight;
    }
}

// initialize the sliders
var slider3 = document.getElementById('slider3');

const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
var nowMinutes = format.from(nowStr);
const MINUTES_OFFSET = 120;
var lockedValues = [nowMinutes, nowMinutes + MINUTES_OFFSET];
const START_OF_DAY = 0;
const LAST_MINUTE = 23 * 60 + 59;

noUiSlider.create(slider3, {
    start: [nowMinutes, nowMinutes + MINUTES_OFFSET], // two sets of sliders
    step: 30,
    behaviour: 'drag', // slider itself is draggable
    connect: true,
    range: {
        min: START_OF_DAY,
        max: LAST_MINUTE
    }
});

/**
 * set values in lockedValues, which keeps track of locked values...
 */
function setLockedValues() {
    lockedValues = [
        Number(slider3.noUiSlider.get()[0]),
        Number(slider3.noUiSlider.get()[1])
    ];
}

slider3.noUiSlider.on('change', setLockedValues);

// updating the sliders updates the inputs
var inputNumber1 = document.getElementById('departingTime');
var inputNumber2 = document.getElementById('arrivalTime');

slider3.noUiSlider.on('update', function (values, handle) {
    inputNumber1.value = format.to(values[0]);
    inputNumber2.value = format.to(values[1]);
});

// updating the inputs updates the sliders as well
inputNumber1.addEventListener('change', function() {
    var startMinutes = format.from(inputNumber1.value);
    slider3.noUiSlider.set([startMinutes, null]);
});

inputNumber2.addEventListener('change', function() {
    var endMinutes = format.from(inputNumber2.value);
    slider3.noUiSlider.set([null, endMinutes]);
});
