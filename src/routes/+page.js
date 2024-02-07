import { csv } from "d3-fetch";
const d3 = { csv };

export async function load({ fetch }) {
  // `fetch` understands the relative path and saves the response
  const response = await fetch(
    "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data_global/index_days.json"
  );

  // SvelteKit is going to generate the types
  const dates_raw = await response.json();
  // let selected_date = dates_with_data[dates_with_data.length - 1];
  let selected_date = dates_raw[dates_raw.length - 1]["latest_time"];

  let d = await d3.csv("data/spots.csv");

  return { selected_date: selected_date, dates_raw: dates_raw };
}
