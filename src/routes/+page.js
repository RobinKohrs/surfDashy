import { csv } from "d3-fetch";
const d3 = { csv };

export async function load({ fetch }) {
  console.log("in load funciton");
  // `fetch` understands the relative path and saves the response
  // inside the HTML to be reused avoiding additional requests
  const response = await fetch(
    "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data_global/index_days.json"
  );

  // SvelteKit is going to generate the types
  const dates_raw = await response.json();
  let dates_with_data = dates_raw.map((e) => new Date(e.replaceAll("_", "-")));
  let selected_date = dates_with_data[dates_with_data.length - 1];

  let d = await d3.csv("data/spots.csv");
  console.log("d: ", d);

  return { selected_date: selected_date, all_dates: dates_with_data };
}
