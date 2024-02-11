<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { clear } from "$lib/assets/icons.js";
  import params from "$lib/assets/params.json";
  import { LineChart } from "lucide-svelte";

  export let data;
  export let selected_variable_color;
  export let selected_variable_size;
  export let currentSizeVal;
  export let currentColorVal;
  export let scaleSize;
  export let scaleColor;

  $: size_val_name = params.variables.find(
    (v) => v.id === selected_variable_size
  )["display"];
  $: color_val_name = params.variables.find(
    (v) => v.id === selected_variable_color
  )["display"];
  $: size_val_suffix = params.variables.find(
    (v) => v.id === selected_variable_size
  )["suffix"];
  $: color_val_suffix = params.variables.find(
    (v) => v.id === selected_variable_color
  )["suffix"];
</script>

<div
  transition:slide
  class="spot-tooltip fixed bg-[rgba(255,255,255,.93)] w-full max-w-[500px] rounded-b-lg text-xl top-0 left-1/2 z-[2000] -translate-x-1/2 overflow-hidden"
>
  <div class="infopanel header flex justify-between px-4">
    <button class="w-8 aspect-square">
      <a href={`statistics/${data["_id"]}`}>
        <LineChart />
      </a>
    </button>
    <div
      class="grid__item title py-2 font-2-xl font-bold text-center underline"
    >
      <a
        href={`https://www.surfline.com/surf-report/test/${data["_id"]}`}
        target="_blank">{data.name}</a
      >
    </div>
    <button
      class="w-8 aspect-square"
      on:click={() => {
        dispatch("close", "");
      }}
    >
      {@html clear}
    </button>
  </div>
  <div
    class="statistics__grid"
    style:color={$currentColorVal > 2 ? "white" : "black"}
    style:background-color={scaleColor($currentColorVal)}
  >
    <div class="item-1 flex flex-col items-center">
      <div class="grid__item label size">
        {size_val_name}
      </div>
      <div class="grid__item value size text-center">
        {$currentSizeVal.toFixed(2)}&nbsp;{size_val_suffix || ""}
      </div>
    </div>
    <div class="item-2 flex flex-col items-center">
      <div class="grid__item label color">
        {color_val_name}
      </div>
      <div class="grid__item value color text-center">
        {$currentColorVal.toFixed(2)}&nbsp;{color_val_suffix || ""}
      </div>
    </div>
  </div>
</div>

<style>
  .statistics__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .statistics__grid .label {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
