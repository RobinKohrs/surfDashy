<script>
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
    isDateInArray,
    getDayOfYear,
    findIndexOfDate,
    getUrlForDay,
    fetchData,
  } from "../lib/utils";

  // params for padding
  let padding = {
    left: 20,
    right: 20,
  };

  export let dialog_open;
  let dialog_container;
  let dialog_width;

  export let available_days = [];

  function closeModal() {
    dialog_open = false;
  }

  // once there are dates, group them
  $: if (available_days.length > 0) {
    group_by_year(available_days);
  }

  let data_by_year = {};
  $: min_year = Math.min(...Object.keys(data_by_year).map((e) => +e));
  $: max_year = Math.max(...Object.keys(data_by_year).map((e) => +e));
  $: selected_year = +min_year;
  function group_by_year(dates) {
    dates.forEach((d) => {
      let year_that_date = d.getFullYear();
      if (!data_by_year[year_that_date]) {
        data_by_year[year_that_date] = [];
      }

      data_by_year[year_that_date].push(d);
    });
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
  }
</script>

<div class="dialog__outer z-[100] fixed min-h-screen w-full backdrop-blur">
  <div
    bind:this={dialog_container}
    bind:offsetWidth={dialog_width}
    class="dialog__inner bg-slate-100 min-h-screen mx-auto max-w-[1080px] left-0 right-0 p-4"
  >
    <button on:click={closeModal} class="absolute top-0 right-0 w-12 h-12"
      >{@html clear}</button
    >
    <h1 class="text-2xl">Settings</h1>
    <Checkbox
      value_selected={"per Day"}
      value_unselected={"per Month"}
      color_selected={"firebrick"}
      selected={"per Day"}
    />
    <hr class="my-8" />

    <!-- select year -->
    <div class="year__select">
      <div>Select the year:</div>
      <div class="year__select__buttons flex gap-2 items-stretch my-2">
        {#each [...Object.keys(data_by_year), 2020, 2019] as year, i}
          <button
            on:click={() => (selected_year = +year)}
            style:background-color={+year === +selected_year
              ? "rgba(0,0,0,.2)"
              : ""}
            class="px-2 py-1 border border-gray-400 rounded-lg hover:bg-gray-200"
            >{year}</button
          >
        {/each}
      </div>
    </div>
    <hr class="my-8" />

    <!-- dates -->
    <div class="date__select">
      <label class="block text-center" for="date-slide">
        <span class="text-2xl">Selected Day:&nbsp;</span>
        <span
          class="text-4xl"
          style="font-weight: 900;"
          style:color={isDateInArray(selected_day, available_days)
            ? "#576e82"
            : "#ababab"}
        >
          {selected_day.toLocaleString("en", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </label>
      <div class="date-slider-container flex flex-col items-stretch">
        <div
          class="dates-indicator-container flex w-full rounded-md overflow-clip"
        >
          {#each all_days_in_year as diy, i}
            {@const day = new Date(diy)}
            <div
              data-day={diy}
              style:width={`${dialog_width / 365}px`}
              class="h-4"
              style:background-color={isDateInArray(diy, available_days)
                ? "#95c3cf"
                : "#d1d1cf"}
            ></div>
          {/each}
        </div>
        <input
          on:click={handleSelect}
          class="block w-full"
          type="range"
          name=""
          id="date-slide"
          min="0"
          max={all_days_in_year.length - 1}
          bind:value={selected_date_index}
        />
      </div>
      <div class="date-axis flex justify-between">
        {#each Array(3) as tick, i}
          {#if i === 0}
            <span>Jan.</span>
          {:else if i === 1}
            <span>Jul.</span>
          {:else}
            <span>Dez.</span>
          {/if}
        {/each}
        <!-- <svg class="w-full h-10">
          <g bind:this={gx} transform="translate(0,10)" />
        </svg> -->
      </div>
    </div>
  </div>
</div>

<style>
  :global(.date-axis path) {
    fill: none;
    stroke: #ababab;
    shape-rendering: crispEdges;
  }
</style>
