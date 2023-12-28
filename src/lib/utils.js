import { csv } from "d3-fetch";
import { scaleLinear, scaleLog, scalePow } from "d3-scale";
import { extent } from "d3-array";
const d3 = { csv, scaleLinear, extent, scaleLog, scalePow };

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

export function getUrlForDay({ url, date }) {
  let date_formatted = `${date.getFullYear()}_${date.getMonth() + 1}_${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  let url_full = `${url}/${date_formatted}.csv`;
  return url_full;
}

export async function fetchData(url) {
  let succeed;
  let data;
  try {
    data = await d3.csv(url);
    succeed = true;
  } catch (error) {
    succeed = false;
  }

  return {
    data,
    succeed,
  };
}

export async function getScales(data_array, accessor, rng) {
  let dd = data_array.map((d) => +d[accessor]).filter((v) => !isNaN(v));
  let ext = d3.extent(dd);
  ext[0] = ext[0] + 0.0001;
  // let sc = d3.scaleLinear().domain(ext).range(rng);
  let sc = d3.scalePow().exponent(2).domain(ext).range(rng);
  return sc;
}
