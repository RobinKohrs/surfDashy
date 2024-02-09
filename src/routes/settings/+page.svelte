<script>
  import Radio from "$lib/ui/Radio.svelte";
  import params from "$lib/assets/params.json";
  import { slide } from "svelte/transition";
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

  let selectedSize, selectedColor;

  $: if (selectedSize) {
    selectedSizeId.set(selectedSize);
  }

  if ($selectedSizeId) {
    selectedSize = $selectedSizeId;
  }

  $: if (selectedColor) {
    selectedColorId.set(selectedColor);
  }

  if ($selectedColorId) {
    selectedColor = $selectedColorId;
  }
</script>

<section class="variable">
  <h2 class="">Select variables for map</h2>
  <div class="variables-container grid grid-rows-2 dt:grid-cols-2">
    <div class="size">
      <h3>Size</h3>
      <div class="size-selection">
        <Radio
          _id={1}
          options={params.variables}
          legend={""}
          userSelected={selectedSize}
        />
      </div>
    </div>
    <div class="size">
      <h3>Color</h3>
      <div class="color-selection">
        <Radio
          _id={2}
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
