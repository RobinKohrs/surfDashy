<script>
  import LeafletMap from "./lib/LeafletMap.svelte";
  import { settings, search, time } from "./assets/icons";
  import { csv, json } from "d3-fetch";
  import Search from "./lib/Search.svelte";
  import Dialog from "./lib/Dialog.svelte";
  import { getScales, handleSelect, getDatesWithData } from "./lib/utils";
  const d3 = { csv, json };

  const PARAMS = {
    primaryColor: "#8c66b2",
    activeMarkerColor: "cornflowerblue",
  };

  let map;
  let L;
  function initMap(event) {
    map = event.detail.map;
    L = event.detail.L;
    addSpots();
  }

  ////////////////
  // Load the available surf data
  ////////////////

  // days
  let path_dates =
    "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data/index_days.json";
  let dates_with_data, selected_date;
  getDatesWithData().then((d) => {
    console.log("d: ", d);
  });

  // load surf spot data
  let spots_path = "data/spots.csv";
  let surf_spots;
  let circle_marker;
  async function addSpots() {
    surf_spots = await d3.csv(spots_path);
    circle_marker = surf_spots.map((s, i) => {
      let cm = L.circleMarker([s.lat, s.lon], {
        radius: 8,
        fillColor: PARAMS.primaryColor,
        fillOpacity: 0.75,
        stroke: false,
      });

      cm.on("click", () => setActiveSpot({ marker: cm, marker_data: s }));

      let popup_text = `<div style="font-size: 2rem; font-weight: bold;">${s.name}</span>`;
      cm.bindTooltip(popup_text);
      cm.addTo(map);
      return {
        marker: cm,
        spot: s,
      };
    });
  }

  let active_spot;
  function setActiveSpot(as) {
    // reset old
    if (active_spot) {
      active_spot.marker.setStyle({ fillColor: PARAMS.primaryColor });
    }

    // set new
    active_spot = as;
    active_spot.marker.setStyle({ fillColor: PARAMS.activeMarkerColor });
  }

  // search bar
  let search_open = false;

  // dialog
  let dialog_open;

  ////////////////
  // handle data coming after date select
  ////////////////

  let current_map_data;
  function handleData({ detail }) {
    calculating_scales = true;
    setTimeout(() => {
      current_map_data = detail.data;
    }, 60);
  }

  ////////////////
  // Get the scales for the data displayed
  ////////////////
  let size_scale, color_scale;
  let curr_variable = "daily_mean_swell_rating";
  let calculating_scales = false;
  $: if (current_map_data) {
    styleMarkersNewData(circle_marker);
  }

  async function styleMarkersNewData(circle_marker) {
    size_scale = await getScales(current_map_data, curr_variable, [0.2, 20]);
    color_scale = await getScales(current_map_data, curr_variable, [
      "white",
      PARAMS.primaryColor,
    ]);
    circle_marker.forEach((cm, i) => {
      // find current map data
      let f = current_map_data.find((c) => c._id == cm.spot.id);
      let size = size_scale(+f[curr_variable]);
      let color = color_scale(+f[curr_variable]);
      cm.marker.setStyle({ radius: size, fillColor: color });
    });
    calculating_scales = false;
  }

  let mapContainer;
  let mapHeight;
  $: if (mapContainer) {
    mapHeight = mapContainer.offsetHeight;
  }

  // the selected options
  // selected month
  let day_or_moth = "per_day";
  let selected_month = new Date().getMonth();
  // selected year
  let selected_year = new Date().getFullYear();
  // days in the selected month
  let selected_dom = String(new Date().getDate());
  let selected_options = {
    day_or_moth,
    selected_year,
    selected_month,
    selected_dom,
  };
</script>

<!-- <main class="dashboard-cotainer min-h-screen flex flex-col">
  {#if calculating_scales}
    <div class="fixed z-[2000]">CALCULATING</div>
  {/if}

  <div
    class="z-[2] self-stretch w-full max-w-[1080px] mx-auto sticky top-0 flex gap-2 justify-between items-center text-xl dt:text-3xl py-2 dt:py-6 px-2 min-h-[50px]"
  >
    {#if search_open}
      <div class="absolute inset-0 z-[2]">
        <Search
          searchable={surf_spots}
          options={{ keys: ["name"] }}
          on:closeSearch={() => (search_open = !search_open)}
          on:select={(e) => handleSelect(map, e)}
        />
      </div>
    {/if}

    <button
      on:click={() => (search_open = !search_open)}
      class="header-search flex-shrink-0 w-[30px]">{@html search}</button
    >
    <span class="header-title text-center max-w-[60%]">
      The
      <span class="font-bold" style="color: {PARAMS.primaryColor}"
        >Surfspot&shy;</span
      >
      Archive
    </span>
    <button
      class="flex-shrink-0 header-setting w-[30px]"
      on:click={() => (dialog_open = !dialog_open)}>{@html settings}</button
    >
  </div>

  {#if dialog_open}
    <Dialog
      bind:selected_options
      bind:dialog_open
      {available_days}
      on:dataLoaded={handleData}
    />
  {/if}

  <div class="z-[1] content-container flex-grow" bind:this={mapContainer}>
    {#if mapHeight}
      <LeafletMap
        on:mapLoaded={initMap}
        {mapHeight}
        set_view={[-22.948787528229474, -43.239910128238364]}
      />
    {/if}
  </div>
</main> -->

<style></style>
