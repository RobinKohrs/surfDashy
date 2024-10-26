<script>
  import Radio from "$lib/ui/Radio.svelte";
  import params from "$lib/assets/params.json";
  import { getInitialData } from "$lib/utils";
  import { selectedColorId, selectedSizeId } from "$lib/stores/stores.js";

  let surfspots;
  getInitialData().then((d) => {
    surfspots = d.data_coordinates;
  });

  let show_popup;
  function pickDefaultLocation({ detail }) {
    show_popup = true;
    setTimeout(() => {
      show_popup = false;
    }, 1000);
  }

  let selectedColor;
  // basemaps

  $: if (selectedColor) {
    selectedColorId.set(selectedColor);
  }

  if ($selectedColorId) {
    selectedColor = $selectedColorId;
  }
</script>

<section class="shortcuts">
  <h2>Shortcuts</h2>
  <div class="text-sm text-center pb-2">(work only in the map-view)</div>
  <ul class="list-disc list-inside">
    <li class="shortcut">Ctrl + k = Search for spot</li>
    <li class="shortcut">Ctrl + d = Pick a date</li>
    <li class="shortcut">Ctrl + m = open the menu</li>
  </ul>
</section>
<section class="basemap">
  <h2>Basemap</h2>
  <Radio legend={""} options={[{ id: "bathy", display: "Bathymetry" }]} />
</section>
<section class="variable">
  <h2 class="">Select variables for Colormapping</h2>
  <div class="variables-container">
    <div class="size">
      <div class="color-selection">
        <Radio
          options={params.variables}
          legend={""}
          bind:userSelected={selectedColor}
        />
      </div>
    </div>
  </div>
</section>

<!-- <section class="default location relative">
  <h2>Default location</h2>
  <search class="container w-full min-h-12">
    <Search
      searchable={surfspots}
      options={{ keys: ["name"] }}
      on:selectSearch={pickDefaultLocation}
    />

    {#if show_popup}
      <div
        transition:slide
        class="absolute top-0 inset-x-0 bg-red-200 px-5 py-8 rounded-md"
      >
        Default location selected:
      </div>
    {/if}
  </search>
</section> -->

<style>
  section:not(section:nth-of-type(1)) {
    margin-top: 2rem;
  }
  section h2 {
    font-size: clamp(1.3rem, 2.5vw, 1.6rem);
    text-decoration: underline;
    text-align: center;
  }

  section h3 {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    padding-block: 0.5rem;
  }
</style>
