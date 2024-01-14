<script>
  import LeafletMap from "./lib/LeafletMap.svelte";
  import { settings, search, time } from "./assets/icons";
  import { csv, json } from "d3-fetch";
  import Search from "./lib/Search.svelte";
  import Dialog from "./lib/Dialog.svelte";
  import SizeLegend from "./lib/sizeLegend.svelte";
  import params from "./assets/params.json";
  import {
    getScales,
    handleSelect,
    getInitialData,
    getDataForDay,
    drawMap,
    resetStyle,
  } from "./lib/utils";
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
  let mapHeight;
  $: if (mapContainer) {
    mapHeight = mapContainer.offsetHeight;
  }

  // once map loaded
  let map, L;
  function initMap(event) {
    map = event.detail.map;
    L = event.detail.L;
    // setTimeout(() => {
    //   map.setZoom(12);
    // }, 100);
  }

  // get the data for that date and variable
  let selected_variable_color = "daily_mean_water_temperature_max";
  let selected_variable_size = "daily_mean_swell_rating";
  let data_current;
  $: if (selected_date && map) {
    getDataForDay(map, selected_date).then((d) => {
      data_current = d.data;
    });
  }

  let active_spot_id, active_spot_marker, active_spot_data;
  const onSpotClick = (event, marker, spot) => {
    // if there is an active id already
    if (active_spot_id) {
      let _color = scaleColor(spot[selected_variable_color]);
      let _size = scaleSize(spot[selected_variable_size]);
      resetStyle(active_spot_marker, _size, _color);
    }

    // set new
    active_spot_data = spot;
    active_spot_marker = marker;
    active_spot_id = spot._id;
    marker.setStyle({ fillColor: "green" });
  };

  let scaleSize, scaleColor;
  $: if (data_current) {
    // get the new scales
    scaleSize = getScales(data_current, selected_variable_size, [3, 15]);
    scaleColor = getScales(data_current, selected_variable_color, [
      "white",
      "darkred",
    ]);

    // draw the data
    drawMap(
      map,
      data_current,
      selected_variable_color,
      selected_variable_size,
      scaleSize,
      scaleColor,
      onSpotClick
    );
  }

  // TODO: gradually rebuild app svelte from _App.svelte!!
</script>

<div class="app__container min-h-screen">
  <!-- <div>
    <SizeLegend />
  </div> -->
  <div class="z-[1] content-container" bind:clientHeight={mapHeight}>
    {#if mapHeight > 0}
      <LeafletMap
        on:mapLoaded={initMap}
        height={mapHeight}
        set_view={[-22.948787528229474, -43.239910128238364]}
      />
    {/if}
  </div>
</div>

<style>
  .app__container {
    display: grid;
    grid-template-rows: 1fr;
  }
</style>
