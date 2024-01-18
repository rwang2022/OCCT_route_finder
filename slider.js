import noUiSlider from './nouislider/dist/nouislider.mjs';

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

const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
var nowMinutes = format.from(nowStr);
const MINUTES_OFFSET = 60;
var lockedState = true;

var lockedValues = [nowMinutes, nowMinutes + MINUTES_OFFSET];
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');
var lockButton = document.getElementById('lockbutton');
lockButton.addEventListener('click', function () {
    lockedState = !lockedState;
    this.textContent = lockedState ? 'Unlock' : 'Lock';
});
function crossUpdate(value, slider) {
    if (!lockedState) return;
    var a = slider1 === slider ? 0 : 1;
    var b = a ? 0 : 1;
    value -= lockedValues[b] - lockedValues[a];
    slider.noUiSlider.set(value);
}
const START_OF_DAY = 0;
const LAST_MINUTE = 23 * 60 + 59;
noUiSlider.create(slider1, {
    start: nowMinutes,
    animate: false,
    range: {
        min: START_OF_DAY,
        max: LAST_MINUTE
    }
});
noUiSlider.create(slider2, {
    start: nowMinutes + MINUTES_OFFSET,
    animate: false,
    range: {
        min: START_OF_DAY,
        max: LAST_MINUTE
    }
});
// slider1.noUiSlider.on('update', function (values, handle) {
//     slider1Value.innerHTML = format.to(values[handle]);
// });
// slider2.noUiSlider.on('update', function (values, handle) {
//     slider2Value.innerHTML = format.to(values[handle]);
// });
function setLockedValues() {
    lockedValues = [
        Number(slider1.noUiSlider.get()),
        Number(slider2.noUiSlider.get())
    ];
}
slider1.noUiSlider.on('change', setLockedValues);
slider2.noUiSlider.on('change', setLockedValues);
slider1.noUiSlider.on('slide', function (values, handle) {
    crossUpdate(values[handle], slider2);
});
slider2.noUiSlider.on('slide', function (values, handle) {
    crossUpdate(values[handle], slider1);
});


// ! experimental
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');

var inputNumber1 = document.getElementById('departingTime');
var inputNumber2 = document.getElementById('arrivalTime');

slider1.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];

    if (handle) {
        inputNumber2.value = format.to(value);
    } else {
        inputNumber1.value = format.to(value);
    }
});

slider2.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];

    if (handle) {
        inputNumber1.value = format.to(value);
    } else {
        inputNumber2.value = format.to(value);
    }
});

inputNumber1.addEventListener('change', function () {
    slider1.noUiSlider.set([this.value, null]);
});

inputNumber2.addEventListener('change', function () {
    slider1.noUiSlider.set([null, this.value]);
});