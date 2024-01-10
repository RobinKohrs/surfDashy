<script>
  import { slide } from "svelte/transition";
  import ButtonBar from "./../lib/ButtonBar.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import Checkbox from "./Checkbox.svelte";
  import { clear } from "./../assets/icons";

  // d3
  import { scaleTime } from "d3-scale";
  import { extent } from "d3-array";
  import { axisBottom } from "d3-axis";
  import { select } from "d3-selection";
  import { timeMonth, timeYear } from "d3-time";
  import { timeFormat } from "d3-time-format";
  const d3 = {
    scaleTime,
    extent,
    axisBottom,
    select,
    timeMonth,
    timeYear,
    timeFormat,
  };

  import {
    getAllDaysInYear,
    getAllDaysInMonth,
    isDateInArray,
    getDayOfYear,
    findIndexOfDate,
    getUrlForDay,
    fetchData,
    group_by_year,
    build_selected_options,
  } from "../lib/utils";

  // params for padding
  let padding = {
    left: 20,
    right: 20,
  };

  export let dialog_open;
  export let selected_options;
  export let available_days = [];

  // dialog with
  let dialog_container;
  let dialog_width;

  function closeModal() {
    dialog_open = false;
  }

  // once there are dates, group them
  let data_by_year = {};
  let years_with_data;
  $: if (available_days.length > 0) {
    data_by_year = group_by_year(available_days);
  }

  let all_days_in_year;
  let dates_loaded;
  $: if (selected_year) {
    all_days_in_year = getAllDaysInYear(selected_year);
    dates_loaded = true;
  }

  // selected day
  let selected_date_index;
  let index_today;
  $: selected_day = all_days_in_year[selected_date_index];
  $: if (all_days_in_year) {
    index_today = findIndexOfDate(new Date(), all_days_in_year);
    if (!selected_date_index) {
      selected_date_index = index_today;
    }
  }

  // handle the select by the range slider
  async function handleSelect() {
    let url = await getUrlForDay({
      url: "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data/data/",
      date: selected_day,
    });
    let data = await fetchData(url);
    dispatch("dataLoaded", data);
  }

  let months = Array.from({ length: 12 }).map((e, i) => {
    let d = new Date(2023, i, 1);
    let month = d.toLocaleString("default", { month: "long" });
    return {
      display: month,
      slug: i,
    };
  });

  // selected day or month
  let day_or_moth = "per_day";

  // selected month
  let selected_month = new Date().getMonth();

  // selected year
  let selected_year = new Date().getFullYear();

  let selected_dom = String(new Date().getDate());

  $: if (day_or_moth == "per_month") {
    selected_dom = "";
  }

  // days in the selected month
  let days_in_month;
  $: if (selected_month || selected_year) {
    days_in_month = getAllDaysInMonth(selected_year, selected_month);
  }

  $: selected_date = `${day_or_moth}_${selected_year}_${selected_month}${
    day_or_moth === "per_day" ? "_" + selected_dom : ""
  }`;

  $: console.log("sd: ", selected_date);
</script>

<div
  transition:slide
  class="dialog__outer z-[2000] fixed min-h-screen w-full backdrop-blur"
>
  <div
    bind:this={dialog_container}
    bind:offsetWidth={dialog_width}
    class="dialog__inner bg-slate-100 min-h-screen mx-auto max-w-[1080px] left-0 right-0 p-4"
  >
    <button on:click={closeModal} class="absolute top-0 right-0 w-12 h-12"
      >{@html clear}</button
    >
    <h1 transition:slide class="text-2xl">Settings</h1>

    <!-- per month or day -->
    <div class="select__per_day_month" transition:slide>
      <ButtonBar
        options={[
          { display: "per Day", slug: "per_day" },
          { display: "per Month", slug: "per_month" },
        ]}
        bind:selected={day_or_moth}
      />
    </div>
    <!-- per month or day -->

    <hr class="my-4" />

    <!-- select year -->
    <div class="select__year" transition:slide>
      <ButtonBar
        options={[
          { display: "2020", slug: 2020 },
          { display: "2021", slug: 2021 },
          { display: "2022", slug: 2022 },
          { display: "2023", slug: 2023 },
          { display: "2024", slug: 2024 },
        ]}
        bind:selected={selected_year}
      />
    </div>

    <hr class="my-4" />

    <!-- select month -->
    <div class="select__month" transition:slide>
      <ButtonBar options={months} bind:selected={selected_month} />
    </div>

    {#if day_or_moth === "per_day"}
      <hr class="my-4" />
      <div transition:slide={{ axis: "x" }} class="buttonbar__days">
        <ButtonBar options={days_in_month} bind:selected={selected_dom} />
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.date-axis path) {
    fill: none;
    stroke: #ababab;
    shape-rendering: crispEdges;
  }
</style>
