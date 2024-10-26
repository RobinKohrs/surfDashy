<script>
  import { extent } from "d3-array";
  const d3 = { extent };
  export let scaleColor;

  export let data_current;
  export let selected_variable_color;
  let domain;

  $: if (data_current) {
    domain = d3
      .extent(data_current.map((e) => +e[selected_variable_color] || 0))
      .map((e) => e.toFixed(2));
  }
  let vals;
  $: if (domain) {
    vals = Array.from({ length: 100 }).map((e, i) => {
      let resc = (i / 100) * (domain[1] - domain[0]) - domain[0];
      return resc;
    });
  }
</script>

{#if vals && scaleColor}
  <div class="legend-color flex flex-col">
    <div class="legend-color-header flex justify-between px-3">
      <span
        >{domain[0]}{selected_variable_color.includes("temp")
          ? " °C"
          : selected_variable_color.includes("height")
            ? " m."
            : ""}</span
      >
      <span
        >{selected_variable_color.includes("temp")
          ? " Water Temp"
          : selected_variable_color.includes("height")
            ? " Wave Height"
            : "Swell Rating"}</span
      >
      <span
        >{domain[1]}{selected_variable_color.includes("temp")
          ? " °C"
          : selected_variable_color.includes("height")
            ? " m."
            : ""}</span
      >
    </div>
    <div class="legend-color-inner w-full h-3 flex rounded-md overflow-hidden">
      {#each vals as val}
        <div class="flex-1" style:background-color={scaleColor(val)}></div>
      {/each}
    </div>
  </div>
{/if}
