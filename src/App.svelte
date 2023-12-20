<script>
  import LeafletMap from "./lib/LeafletMap.svelte";
  import { settings, search, time } from "./assets/icons";
  import { csv, json } from "d3-fetch";
  import Search from "./lib/Search.svelte";
  import Dialog from "./lib/Dialog.svelte";
  const d3 = { csv, json };

  const PARAMS = {
    primaryColor: "#8c66b2",
  };

  let map;
  let L;
  function initMap(event) {
    map = event.detail.map;
    L = event.detail.L;
    addSpots();
  }

  // load surf spot data
  let spots_path = "data/spots.csv";
  let surf_spots;
  async function addSpots() {
    surf_spots = await d3.csv(spots_path);
    // console.log("surfspots: ", surf_spots);
    surf_spots.forEach((s, i) => {
      let cm = L.circleMarker([s.lat, s.lon], {
        radius: 12,
        color: PARAMS.primaryColor,
      });
      let popup_text = `<div style="font-size: 2rem; font-weight: bold;">${s.name}</span>`;
      cm.bindTooltip(popup_text);
      cm.addTo(map);
    });
  }

  // search bar
  let search_open = false;

  function handleSelect({ detail }) {
    map.flyTo([detail.lat, detail.lon], 12, {
      animate: false,
      duration: 2,
    });
  }

  ////////////////
  // available data
  ////////////////

  // days
  let available_days;
  let path_days =
    "https://raw.githubusercontent.com/RobinKohrs/r-cadeasondas/main/data_preprocessed/daily_data/index_days.json";
  d3.json(path_days).then((days) => {
    available_days = days.map((e) => new Date(e.replaceAll("_", "-")));
  });

  // dialog
  let dialog_open;
</script>

<main class="dashboard-cotainer min-h-screen flex flex-col">
  <div
    class="self-stretch z-[2] w-full max-w-[1080px] mx-auto sticky top-0 flex gap-2 justify-between items-center text-xl dt:text-3xl py-2 dt:py-6 px-2 min-h-[50px]"
  >
    <!-- Search open -->
    {#if search_open}
      <div class="absolute inset-0">
        <Search
          searchable={surf_spots}
          options={{ keys: ["name"] }}
          on:closeSearch={() => (search_open = !search_open)}
          on:select={handleSelect}
        />
      </div>
    {/if}

    <!-- Normal nav bar -->
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

  <!-- Settgins -->
  {#if dialog_open}
    <Dialog bind:dialog_open {available_days} />
  {/if}

  <!-- THE MAP -->
  <div class="content-container z-[1] flex-grow h-20">
    <LeafletMap
      on:mapLoaded={initMap}
      set_view={[-22.948787528229474, -43.239910128238364]}
    />
  </div>

  <!-- the settings -->
  <!-- <div class="self-stretch w-full max-w-[1080px] mx-auto">
    <button>{@html time}</button>
  </div> -->
</main>

<style></style>
