"use strict";

var _nouislider = _interopRequireDefault(require("/nouislider/dist/nouislider.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var format = {
  to: function to(minutesAfterMidnight) {
    minutesAfterMidnight = Math.round(minutesAfterMidnight);
    var hours = Math.floor(minutesAfterMidnight / 60);
    var minutes = minutesAfterMidnight % 60;
    var meridiem = hours < 12 ? "AM" : "PM";
    var formattedHours = hours % 12 || 12;
    var timeString = "".concat(String(formattedHours), ":").concat(String(minutes).padStart(2, '0')).concat(meridiem);
    return timeString;
  },
  from: function from(timeStr) {
    timeStr = timeStr.trim();
    var time = timeStr.slice(0, -2);
    var meridiem = timeStr.slice(-2, undefined);

    var _time$split = time.split(":"),
        _time$split2 = _slicedToArray(_time$split, 2),
        hoursStr = _time$split2[0],
        minutesStr = _time$split2[1];

    var hours = parseInt(hoursStr, 10);
    var minutes = parseInt(minutesStr, 10);

    if (meridiem === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }

    var minutesAfterMidnight = hours * 60 + minutes;
    return minutesAfterMidnight;
  }
}; // initialize the sliders

var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2'); // create and initialize a locked state

var lockedState = true;
var lockButton = document.getElementById('lockbutton'); // allow the lockbutton to toggle

lockButton.addEventListener('click', function () {
  lockedState = !lockedState;
  $(this).toggleClass('unlocked');
  var touchCollection = document.getElementsByClassName('noUi-touch-area');

  for (var i = 0; i < touchCollection.length; i++) {
    touchCollection[i].toggleAttribute('unlocked');
  }
});
var nowStr = new Date().toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
}).replace(" ", "");
var nowMinutes = format.from(nowStr);
var MINUTES_OFFSET = 60;
var lockedValues = [nowMinutes, nowMinutes + MINUTES_OFFSET];
var START_OF_DAY = 0;
var LAST_MINUTE = 23 * 60 + 59;

_nouislider["default"].create(slider1, {
  start: nowMinutes,
  animate: false,
  range: {
    min: START_OF_DAY,
    max: LAST_MINUTE
  }
});

_nouislider["default"].create(slider2, {
  start: nowMinutes + MINUTES_OFFSET,
  animate: false,
  range: {
    min: START_OF_DAY,
    max: LAST_MINUTE
  }
});
/**
 * set values in lockedValues, which keeps track of locked values...
 */


function setLockedValues() {
  lockedValues = [Number(slider1.noUiSlider.get()), Number(slider2.noUiSlider.get())];
}

slider1.noUiSlider.on('change', setLockedValues);
slider2.noUiSlider.on('change', setLockedValues);
/**
 * sets the values of both sliders when locked
 * @param {*} value value to set the slider as
 * @param {*} slider the slider whose value we want to change
 * @returns nothing
 */

function crossUpdate(value, slider) {
  if (!lockedState) return;
  var a = slider1 === slider ? 0 : 1;
  var b = a ? 0 : 1;
  value -= lockedValues[b] - lockedValues[a];
  slider.noUiSlider.set(value);
}

slider1.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider2);
});
slider2.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider1);
}); // updating the sliders updates the inputs

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
}); // updating the inputs updates the sliders as well

inputNumber1.addEventListener('change', function () {
  var startMinutes = format.from(inputNumber1.value);
  slider1.noUiSlider.setHandle(0, startMinutes);
  crossUpdate(startMinutes, slider2);
});
inputNumber2.addEventListener('change', function () {
  var endMinutes = format.from(inputNumber2.value);
  slider2.noUiSlider.setHandle(0, endMinutes);
  crossUpdate(endMinutes, slider1);
}); // // ! experimental
// var startMinusButton = document.getElementById('start-=15');
// startMinusButton.addEventListener('click', () => {
//     if (lockedState) { 
//         var newTime = format.from(inputNumber1.value) - 15; 
//         slider1.(format.to(newTime)); 
//     }
// });