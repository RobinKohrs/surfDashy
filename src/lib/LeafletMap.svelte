<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import * as L from "leaflet";
  // Import the Leaflet MapTiler Plugin
  import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

  const dispatch = createEventDispatcher();

  let mapElement;
  let map;
  export let height;
  console.log("height: ", height);

  // map options
  export let set_view = [48.2183974, 16.3807465];
  export let zoom = 13;

  onMount(async () => {
    map = L.map(mapElement, {
      preferCanvas: true,
    }).setView(set_view, zoom);

    L.tileLayer
      .wms(
        "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?version=1.3.0",
        {
          layers: "GEBCO_LATEST",
          attribution: "GEBCO",
        }
      )
      .addTo(map);
    dispatch("mapLoaded", { L, map });
  });

  $: if (map && height) {
    map.invalidateSize();
    map.setZoom(12);
  }
</script>

<div
  id="map"
  class="overflow-hidden outline-none"
  style={height ? `height: ${height}px;` : "200px"}
  bind:this={mapElement}
/>

<style>
  @import "leaflet/dist/leaflet.css";

  .vignette {
    pointer-events: none;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1000px rgba(255, 255, 255, 0.9) inset;
  }

  @media screen and (max-width: 700px) {
    .vignette {
      pointer-events: none;
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 100px rgba(255, 255, 255, 0.9) inset;
    }
  }
</style>
