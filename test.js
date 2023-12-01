function filterLinesByCurrentTime(inputText) {
  // Get the current time in HH:MM format
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Split the input text into lines
  const lines = inputText.split('\n').filter(item => item != "");

  let startIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const leftTime = lines[i].split(" ")[0];
    const diff = compareTimes(leftTime, currentTime);
    // console.log("lines[i]: " + lines[i]);
    // console.log("leftTime: " + leftTime);
    // console.log("diff: " + diff);
    if (diff >= 0) {
      startIndex = i;
      return lines.slice(startIndex).join("\n");
    }
  }
}

function parseTime(time) {
  const period = time.slice(-2).toUpperCase();
  const timePart = time.slice(0, -2);
  const hours = parseInt(timePart.split(':')[0], 10);
  const minutes = parseInt(timePart.split(':')[1], 10);

  // console.log("parseTime: " + [hours, minutes, period]);
  return [hours, minutes, period];
}


function compareTimes(time1, time2) {
  const [hours1, minutes1, period1] = parseTime(time1);
  const [hours2, minutes2, period2] = parseTime(time2);

  // Convert 12-hour format to 24-hour format
  const adjustedHours1 = (period1 === 'PM' && hours1 !== 12) ? (hours1 + 12) : hours1;
  const adjustedHours2 = (period2 === 'PM' && hours2 !== 12) ? (hours2 + 12) : hours2;

  return (adjustedHours1 * 60 + minutes1) - (adjustedHours2 * 60 + minutes2);
}


// Example usage:
const inputText = `
7:15AM 7:18AM 7:24AM 7:35AM
7:40AM 7:43AM 7:49AM 8:00AM
8:00AM 8:03AM 8:09AM 8:20AM
8:45AM 8:48AM 8:54AM 9:05AM
9:10AM 9:13AM 9:19AM 9:30AM
9:30AM 9:33AM 9:39AM 9:50AM
9:55AM 9:58AM 10:04AM 10:15AM
10:10AM 10:13AM 10:19AM 10:30AM
10:25AM 10:28AM 10:34AM 10:45AM
10:40AM 10:43AM 10:49AM 11:00AM
11:10AM 11:13AM 11:19AM 11:30AM
11:25AM 11:28AM 11:34AM 11:45AM
11:55AM 11:58AM 12:04PM 12:15PM
12:10PM 12:13PM 12:19PM 12:30PM
12:40PM 12:43PM 12:49PM 1:00PM
12:55PM 12:58PM 1:04PM 1:15PM
1:40PM 1:43PM 1:49PM 2:00PM
2:10PM 2:13PM 2:19PM 2:30PM
2:55PM 2:58PM 3:04PM 3:15PM
3:40PM 3:43PM 3:49PM 4:00PM
4:25PM 4:28PM 4:34PM 4:45PM
5:10PM 5:13PM 5:19PM 5:30PM
5:55PM 5:58PM 6:04PM 6:15PM
6:10PM 6:13PM 6:19PM 6:30PM
7:10PM 7:13PM 7:19PM 7:30PM
7:40PM 7:43PM 7:49PM 8:00PM
8:10PM 8:13PM 8:19PM 8:30PM
8:40PM 8:43PM 8:49PM 9:00PM
9:10PM 9:13PM 9:19PM 9:30PM
9:40PM 9:43PM 9:49PM 10:00PM
10:10PM 10:13PM 10:19PM 10:30PM
Fri10:35PM 10:38PM 10:44PM 10:55PM
Mon-Thu10:40PM 10:43PM 10:49PM 11:00PM
Fri11:35PM 11:38PM 11:44PM 11:55PM
`;

console.log(filterLinesByCurrentTime(inputText));
