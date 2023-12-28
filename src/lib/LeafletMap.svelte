<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import * as L from "leaflet";
  const dispatch = createEventDispatcher();

  let mapElement;
  let map;

  export let tile_layer_options = { ext: "png", attribution: "" };
  export let tile_layer = {
    layer:
      "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}",
  };

  // map options
  export let set_view = [48.2183974, 16.3807465];
  export let zoom = 13;

  onMount(async () => {
    map = L.map(mapElement, {
      preferCanvas: true,
    }).setView(set_view, zoom);
    L.tileLayer(tile_layer.layer, tile_layer_options).addTo(map);

    dispatch("mapLoaded", { L, map });
  });
</script>

<div class="map-container w-full h-full relative bg-purple-500">
  <div class="vignette" />
  <div
    id="map"
    class="overflow-hidden outline-none h-full"
    bind:this={mapElement}
  />
</div>

<style>
  @import "leaflet/dist/leaflet.css";

  #map {
    width: 100%;
    height: 100%;
  }

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
