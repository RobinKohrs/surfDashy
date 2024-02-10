<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { clear } from "$lib/assets/icons.js";
  import params from "$lib/assets/params.json";

  export let data;
  export let selected_variable_color;
  export let selected_variable_size;
  console.log("sel color: ", selected_variable_size);
  export let currentSizeVal;
  export let currentColorVal;

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
  class="spot-tooltip fixed bg-[rgba(255,255,255,.93)] w-full max-w-[500px] px-4 py-2 rounded-b-lg text-xl top-0 left-1/2 z-[2000] -translate-x-1/2"
>
  <button
    class="absolute top-0 right-0 p-2 w-12 aspect-square"
    on:click={() => {
      dispatch("close", "");
    }}
  >
    {@html clear}
  </button>
  <div class="statistics__grid">
    <div
      class="grid__item value name col-span-2 font-2-xl font-bold text-center underline"
    >
      <a
        href={`https://www.surfline.com/surf-report/test/${data["_id"]}`}
        target="_blank">{data.name}</a
      >
    </div>
    <div class="grid__item label size">
      {size_val_name}
    </div>
    <div class="grid__item value size text-center">
      {$currentSizeVal.toFixed(2)}&nbsp;{size_val_suffix || ""}
    </div>
    <div class="grid__item label color">
      {color_val_name}
    </div>
    <div class="grid__item value color text-center">
      {$currentColorVal.toFixed(2)}&nbsp;{color_val_suffix || ""}
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
