const convertTimeInMinutes = (dataTime) =>
  +dataTime.split(':')[0] * 60 + +dataTime.split(':')[1];

const isSchelduleCorrect = (
  workStart,
  workEnd,
  meetingStart,
  meetingDuration
) => {
  workStart = convertTimeInMinutes(workStart);
  workEnd = convertTimeInMinutes(workEnd);
  meetingStart = convertTimeInMinutes(meetingStart);
  if (workStart > meetingStart || workEnd < meetingStart + meetingDuration) {
    return false;
  }
  return true;
};
/*console.log(isSchelduleCorrect('08:00', '17:30', '14:00', 90)); // true
console.log(isSchelduleCorrect('8:0', '10:0', '8:0', 120)); // true
console.log(isSchelduleCorrect('08:00', '14:30', '14:00', 90)); // false
console.log(isSchelduleCorrect('14:00', '17:30', '08:0', 90)); // false
console.log(isSchelduleCorrect('8:00', '17:30', '08:00', 900)); // false*/
