<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // leaflet
  // import * as L from "leaflet";
  // Import the Leaflet MapTiler Plugin

  let mapElement;
  let map;
  export let mapheight;

  // map options
  export let set_view = [48.2183974, 16.3807465];
  export let zoom = 4;

  onMount(async () => {
    const leaflet = await import("leaflet");
    const { MaptilerLayer } = await import("@maptiler/leaflet-maptilersdk");
    const leaflet_css = await import("leaflet/dist/leaflet.css");

    map = L.map(mapElement, {
      minZoom: 3,
      noWrap: true,
      preferCanvas: true,
      zoomControl: false,
    }).setView(set_view, zoom);

    // L.tileLayer
    //   .wms(
    //     "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?version=1.3.0",
    //     {
    //       layers: "GEBCO_LATEST",
    //       attribution: "GEBCO",
    //     }
    //   )
    //   .addTo(map);

    // L.tileLayer
    //   .wms(
    //     "http://wmts.marine.copernicus.eu/teroWmts/?service=WMTS&version=1.0.0&request=GetTile",
    //     {
    //       layers: "GLOBAL_MULTIYEAR_WAV_001_032/cmems_mod_glo_wav_my_0.2_PT3H-i_202112/VHM0",
    //     }
    //   )
    //   .addTo(map);

    const mtLayer = new MaptilerLayer({
      apiKey: "YED34JdAn8w32PnMgk9m",
      style:
        "https://api.maptiler.com/maps/1a3d1e7a-4f31-4675-bbd9-a88ede8789bf/style.json?key=YED34JdAn8w32PnMgk9m",
    }).addTo(map);

    dispatch("mapLoaded", { L, map });
  });
</script>

<div
  id="map"
  class="overflow-hidden outline-none h-screen"
  style:height={mapheight}
  bind:this={mapElement}
/>

<style>
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

  :global(.pulse) {
    animation: pulsate 1s ease-out;
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    opacity: 0;
  }

  @keyframes pulsate {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  :global(.pulsate) {
    border: 3px solid pink;
    -webkit-border-radius: 30px;
    height: 40px;
    width: 40px;
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    /*opacity: 0.0*/
  }

  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  :global(.leaflet-control-attribution) {
    display: none;
  }
</style>
