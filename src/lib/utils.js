import { csv, json } from "d3-fetch";
import { scaleLinear, scaleLog, scalePow } from "d3-scale";
import { extent } from "d3-array";
const d3 = { csv, json, scaleLinear, extent, scaleLog, scalePow };

export async function getInitialData() {
  let path_dates =
    "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data_global/index_days.json";

  let path_spot_coordinates = "data/spots.csv";

  // let dates_with_data;
  // let selected_date;
  // d3.json(path_dates).then((d) => {
  //   let dd = d.map((e) => new Date(e.replaceAll("_", "-")));
  //   dates_with_data = dd;
  //   selected_date = dates_with_data[dates_with_data.length - 1];
  // });

  // return { dates_with_data, selected_date };

  // dates with data
  let dates_raw = await d3.json(path_dates);
  let dates_with_data = dates_raw.map((e) => new Date(e.replaceAll("_", "-")));
  let selected_date = dates_with_data[dates_with_data.length - 1];

  // coordinates for spots
  let spots_path = "/data/spots.csv";
  let data_coordinates = await d3.csv(spots_path);

  return { dates_with_data, selected_date, data_coordinates };
}

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

export async function getDataForDay(map, selected_time) {
  let selected_date = new Date(selected_time);
  let url = getUrlForDay({
    url: "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data_global/data/",
    date: selected_date,
  });

  let data = await fetchData(url);
  return data;
}

export async function getDataForMonth(map, selected_time) {
  let selected_date = new Date(selected_time);
  let url = getUrlForMonth({
    url: "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/monthly_data_global/data/",
    date: selected_date,
  });

  console.log("url: ", url);
  let data = await fetchData(url);
  return data;
}

export function drawMap(
  map,
  data_current,
  selected_variable_color,
  selected_variable_size,
  scaleSize,
  scaleColor,
  onClick,
  current_marker
) {
  if (current_marker) {
    current_marker.forEach((m) => {
      map.removeLayer(m.marker);
    });
  }

  let circle_marker = data_current.map((s, i) => {
    let cm = L.circleMarker([s.lat, s.lon], {
      radius: Math.pow(scaleSize(s[selected_variable_size]), 0.5),
      fillColor: scaleColor(s[selected_variable_color]),
      fillOpacity: 0.75,
      color: "black",
      weight: 0.2,
      className: s.name === "Pipeline" ? "pulse" : "",
      // stroke: false,
    });

    cm.on("click", (event) => onClick(event, cm, s));

    // let popup_text = `<div style="font-size: 2rem; font-weight: bold;">${s.name}</span>`;
    // cm.bindTooltip(popup_text);
    cm.addTo(map);
    return {
      marker: cm,
      spot: s,
    };
  });

  addBlinkingIcon(map, [50, 50]);
  return circle_marker;
}

export function addBlinkingIcon(map, coords) {
  let cssIcon = L.divIcon({
    // Specify a class name we can refer to in CSS.
    className: "css-icon",
    html: '<div class="pulsate"></div>',
    // Set marker width and height
    // ,iconAnchor: [11,11]
  });
  console.log("cssIcon: ", cssIcon);

  // L.marker(coords, { icon: cssIcon }).addTo(map);
}

export function resetStyle(marker, size, color) {
  marker.setStyle({
    fillColor: color,
    radius: size,
  });
}

export function getAllDaysInMonth(year, month) {
  let days_in_month;
  let date_first = new Date(year, month, 1);
  let days = [];
  while (date_first.getMonth() === month) {
    days.push(new Date(date_first));
    date_first.setDate(date_first.getDate() + 1);
  }
  days_in_month = days.map((e) => {
    return {
      display: e.getDate(),
      id: e.getDate(),
    };
  });
  return days_in_month;
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

  for (let i = 0; i <= dateArray.length - 1; i++) {
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
  return doy;
}

export function getUrlForDay({ url, date }) {
  let date_formatted = `${date.getFullYear()}_${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}_${date.getDate().toString().padStart(2, "0")}`;

  let url_full = `${url}/${date_formatted}.csv`;
  return url_full;
}

export function getUrlForMonth({ url, date }) {
  let date_formatted = `${date.getFullYear()}_${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  console.log("date formatted: ", date_formatted);

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

export function getScales(data_array, accessor, rng) {
  let dd = data_array.map((d) => +d[accessor]).filter((v) => !isNaN(v));
  let ext = d3.extent(dd);
  let sc = d3.scaleLinear().domain(ext).range(rng);
  // let sc = d3.scalePow().exponent(2).domain(ext).range(rng);
  return sc;
}

export function getScalesLinear(data_array, accessor, rng) {
  let dd = data_array.map((d) => +d[accessor]).filter((v) => !isNaN(v));
  let ext = d3.extent(dd);
  let sc = d3.scaleLinear().domain(ext).range(rng);
  // let sc = d3.scalePow().exponent(2).domain(ext).range(rng);
  return sc;
}

export function handleSelect(map, { detail }) {
  map.flyTo([detail.lat, detail.lon], 12, {
    animate: false,
    duration: 2,
  });
}
export function group_by_year(dates) {
  let data_by_year = {};
  dates.forEach((d) => {
    let year_that_date = d.getFullYear();
    if (!data_by_year[year_that_date]) {
      data_by_year[year_that_date] = [];
    }

    data_by_year[year_that_date].push(d);
  });

  return data_by_year;
}

export function build_selected_options(
  day_or_moth,
  selected_year,
  selected_month,
  selected_dom
) {
  let selected_options = `${day_or_moth}_${selected_year}_${selected_month}${
    day_or_moth === "per_day" ? "_" + selected_dom : ""
  }`;

  return selected_options;
}

/** Dispatch event on click outside of node */
export function clickOutside(node, callbackFn) {
  const handleClick = (event) => {
    event.stopPropagation();
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      callbackFn();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
