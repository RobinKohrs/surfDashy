<script>
  import LeafletMap from "$lib/LeafletMap.svelte";
  import { tweened } from "svelte/motion";
  import { settings, search, time } from "$lib/assets/icons";
  import { csv, json } from "d3-fetch";
  import Search from "$lib/Search.svelte";
  import DatePicker from "$lib/DatePicker.svelte";
  import params from "$lib/assets/params.json";
  import MobileWarning from "$lib/Warning.svelte";
  import InfoPanel from "$lib/InfoPanel.svelte";
  import Hamburger from "$lib/ui/Hamburger.svelte";

  import {
    getScales,
    handleSelect,
    getInitialData,
    getDataForDay,
    getDataForMonth,
    drawMap,
    resetStyle,
  } from "$lib/utils";
  import Overlay from "../lib/ui/Overlay.svelte";
  const d3 = { csv, json };

  // Iniial data
  // days with data and coordinates
  let data_dates, selected_date;
  let data_coordinates;
  getInitialData().then((d) => {
    (data_dates = d.dates_with_data),
      (selected_date = d.selected_date),
      (data_coordinates = d.data_coordinates);
  });

  ///////
  // the map container
  ///////
  let mapContainer;
  let windowHeight;

  // once map loaded
  let map, L;
  function initMap(event) {
    map = event.detail.map;
    L = event.detail.L;
    // setTimeout(() => {
    //   map.setZoom(12);
    // }, 100);
  }

  // setTimeout(() => {
  //   map.setZoom(5);
  // }, 2000);

  // get the data for that date and variable
  let selected_variable_color = params.variables[0]["id"];
  let selected_variable_size = params.variables[3]["id"];
  let data_current;
  let selected_time;
  $: if (selected_date) {
    selected_time = selected_date.getTime();
  }

  $: if ((selected_time && map) || mode === "per_month") {
    if (mode === "per_day") {
      getDataForDay(map, selected_time).then((d) => {
        data_current = d.data;
      });
    }

    if (mode === "per_month") {
      getDataForMonth(map, selected_time).then((d) => {
        data_current = d.data;
      });
    }
  }

  let active_spot_id, active_spot_marker, active_spot_data;

  const onSpotClick = (event, marker, spot) => {
    // if there is an active id already
    if (active_spot_id) {
      resetSelected(active_spot_marker, active_spot_data);
    }

    // set new
    active_spot_data = spot;
    active_spot_marker = marker;
    active_spot_id = spot._id;
    marker.setStyle({ fillColor: "green" });
    tweenVals();
  };

  function resetSelected(marker, marker_data) {
    let _color = scaleColor(marker_data[selected_variable_color]);
    let _size = Math.pow(scaleSize(marker_data[selected_variable_size]), 0.5);
    resetStyle(active_spot_marker, _size, _color);
    active_spot_data = undefined;
    active_spot_id = undefined;
    active_spot_marker = undefined;
  }

  let scaleSize, scaleColor;
  let current_circle_marker_all;
  $: if (data_current) {
    // get the new scales
    scaleSize = getScales(data_current, selected_variable_size, [0, 400]);
    scaleColor = getScales(data_current, selected_variable_color, [
      "white",
      "#b55836",
    ]);

    // draw the data
    current_circle_marker_all = drawMap(
      map,
      data_current,
      selected_variable_color,
      selected_variable_size,
      scaleSize,
      scaleColor,
      onSpotClick,
      current_circle_marker_all
    );
  }

  let show_settings;

  let show_times = false;
  function showTimes() {
    show_times = !show_times;
  }

  // the search
  let show_search;

  ///////
  let currentSizeVal = tweened(0, {
    duration: 300,
  });
  let currentColorVal = tweened(0, {
    duration: 300,
  });

  function tweenVals() {
    currentSizeVal.set(+active_spot_data[selected_variable_size]);
    currentColorVal.set(+active_spot_data[selected_variable_color]);
  }

  // the mode of querying the data
  let mode = "per_day";
  const formatter_month = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  });

  const formatter_day = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let date_display;
  $: if (selected_date) {
    if (mode === "per_month") {
      date_display = formatter_month.format(selected_date);
    } else {
      date_display = formatter_day.format(selected_date);
    }
  }

  let show_menu = false;
</script>

<MobileWarning />
<svelte:window bind:innerHeight={windowHeight} />

<div class="app min-h-screen h-screen">
  <nav
    class="h-12 navbar absolute top-0 w-full rounded-b-lg text-xl z-[1000] flex justify-around items-stretch"
  >
    <div
      class="navbar settings h-full aspect-square rounded-b-lg overflow-hidden bg-[rgba(255,255,255,.7)]"
    >
      <button
        class="w-full h-full"
        disabled={show_times || show_search}
        on:click={() => (show_menu = !show_menu)}
      >
        <Hamburger width={"100%"} ariaExpanded={show_menu} />
      </button>
    </div>

    <div
      class="headline item-date rounded-b-lg overflow-hidden bg-[rgba(255,255,255,.7)] px-2 flex items-center"
    >
      <button
        disabled={show_search || show_settings}
        on:click={showTimes}
        class="h-full w-full"
      >
        {#if selected_date}
          {date_display}
        {/if}
      </button>
    </div>

    <div
      class="headline item-search h-12 aspect-square rounded-b-lg overflow-hidden bg-[rgba(255,255,255,.8)]"
    >
      <button
        disabled={show_times || show_settings}
        on:click={() => (show_search = true)}
      >
        {@html search}
      </button>
    </div>
  </nav>

  <!-- for any potential overlay (Menu, Dates, Search) -->
  <div class="overlay-container pt-14 absolute">
    {#if show_menu}
      <Overlay bind:show_overlay={show_menu}>menu</Overlay>
    {/if}
    {#if show_times}
      <Overlay bind:show_overlay={show_times}>
        <DatePicker
          available_days={data_dates}
          bind:mode
          bind:show_times
          bind:selected_date
        />
      </Overlay>
    {/if}

    {#if show_search}
      <Overlay bind:show_overlay={show_search}>
        <Search
          bind:show_search
          searchable={data_coordinates}
          options={{ keys: ["name"] }}
          on:closeSearch={() => {
            show_search = false;
          }}
          on:selectSearch={(e) => {
            let { detail: item } = e;

            handleSelect(map, e);

            // find the marker
            let marker = current_circle_marker_all.find((ele, i) => {
              return ele.spot["_id"] === item["id"];
            });

            onSpotClick("", marker.marker, marker.spot);

            show_search = !show_search;
          }}
        />
      </Overlay>
    {/if}
  </div>

  {#if windowHeight}
    <LeafletMap
      on:mapLoaded={initMap}
      mapheight={`${windowHeight}px`}
      set_view={[-22.948787528229474, -43.239910128238364]}
    />
  {/if}

  {#if active_spot_data}
    <InfoPanel
      on:close={() => {
        resetSelected(active_spot_marker, active_spot_data);
      }}
      data={active_spot_data}
      {currentSizeVal}
      {currentColorVal}
      {selected_variable_color}
      {selected_variable_size}
    />
  {/if}
</div>

<style>
  /* .content__container {
    display: grid;
    grid-template-rows: auto 1fr;
  } */

  .spot-tooltip > div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .spot-tooltip > div > span:nth-child(1) {
    text-decoration: underline;
  }

  .spot-tooltip > div > span:nth-child(2) {
    font-weight: 800;
  }
</style>
