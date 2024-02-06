<script>
  import ButtonBar from "$lib/ButtonBar.svelte";

  import { getAllDaysInMonth, group_by_year } from "$lib/utils";

  export let available_days = [];
  let available_times;
  $: if (available_days.length > 0) {
    available_times = available_days.map(
      (e) => `${e.getFullYear()}_${e.getMonth()}_${e.getDate()}`
    );
  }

  export let selected_date;
  export let mode = "per_day";
  export let show_times;

  // selected options
  let selected_year;
  let selected_dom;
  let selected_month;

  // once there are dates, group them
  let data_by_year = {};
  let years_with_data = [];
  let months;
  $: if (available_days.length > 0) {
    data_by_year = group_by_year(available_days);
    Object.keys(data_by_year).forEach((y) => {
      let _d = {
        id: y,
        display: y,
      };
      years_with_data.push(_d);
    });
    months = Array.from({ length: 12 }).map((e, i) => {
      let d = new Date(2023, i, 1);
      let month = d.toLocaleString("default", { month: "long" });
      return {
        display: month,
        id: i,
      };
    });
  }

  selected_year = selected_date.getFullYear();
  selected_month = selected_date.getMonth();
  selected_dom = selected_date.getDate();

  let days_in_selected_month;
  $: if (selected_year || selected_month) {
    days_in_selected_month = getAllDaysInMonth(selected_year, selected_month);
    days_in_selected_month.forEach((d) => {
      let _day = `${d.date.getFullYear()}_${d.date.getMonth()}_${d.date.getDate()}`;
      let inc = available_times.includes(_day);
      d["hasData"] = inc;
    });
  }

  $: if (selected_year || selected_month || selected_dom) {
    if (
      selected_month !== selected_date.getMonth() ||
      selected_dom != selected_date.getDate()
    ) {
      selected_date = new Date(selected_year, selected_month, selected_dom);
    }
  }

  function handleClose() {
    show_times = !show_times;
  }
</script>

<div class="flex flex-wrap">
  <div class="select per_day_month">
    <span class="underline">Daily or Monthly Data</span>
    <ButtonBar
      options={[
        { display: "per Day", id: "per_day" },
        { display: "per Month", id: "per_month" },
      ]}
      bind:selected={mode}
    />
  </div>

  <div class="select year">
    <span class="underline">Year:</span>
    <ButtonBar options={years_with_data} bind:selected={selected_year} />
  </div>
</div>

<div class="select month">
  <span class="underline">Month:</span>
  <ButtonBar options={months} bind:selected={selected_month} />
</div>

{#if mode === "per_day"}
  <div class="buttonbar__days">
    <span class="underline">Day:</span>
    <ButtonBar options={days_in_selected_month} bind:selected={selected_dom} />
  </div>
{/if}

<!-- <div class="selected_date text-center text-xl py-4">
    {#if mode === "per_day"}
      {selected_date.toDateString("de")}
    {:else}
      {`${selected_year} / ${selected_month + 1}`}
    {/if}
  </div> -->

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .select::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .example {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
