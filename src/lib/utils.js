export function getAllDaysInYear(year) {
  const startDate = new Date(year, 0, 1); // January 1st
  const endDate = new Date(year, 11, 31); // December 31st
  const daysArray = [];

  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    // Clone the date to avoid object reference issues
    const currentDay = new Date(currentDate);
    daysArray.push(currentDay);
  }

  return daysArray;
}

// Function to check if a date is in an array of dates
export function isDateInArray(targetDate, dateArray) {
  // Extract the date portion of the target date
  const targetDateWithoutTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  // Iterate through the array of dates
  for (const date of dateArray) {
    // Extract the date portion of the current date in the array
    const currentDateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Compare the date portions
    if (targetDateWithoutTime.getTime() === currentDateWithoutTime.getTime()) {
      // The target date is in the array
      return true;
    }
  }

  // The target date is not in the array
  return false;
}

export function findIndexOfDate(targetDate, dateArray) {
  // Extract the date portion of the target date
  const targetDateWithoutTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  for (let i = 0; i <= dateArray.length; i++) {
    let d = dateArray[i];
    const currentDateWithoutTime = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    );

    if (currentDateWithoutTime.getTime() === targetDateWithoutTime.getTime()) {
      return i;
    }
  }
  return 0;
}

export function getDayOfYear(date) {
  let start = new Date(date.getFullYear(), 0, 0);
  let diff = date - start;
  let one_day = 1000 * 60 * 60 * 24;
  let doy = Math.floor(diff / one_day);
  console.log("doy: ", doy);
  return doy;
}
