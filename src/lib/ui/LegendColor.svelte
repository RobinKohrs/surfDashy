<script>
  export let scaleColor;

  // assume it goes from 0 - 4
  let vals = Array.from({ length: 100 }).map((e, i) => {
    return (4 * i) / 100;
  });
</script>

{#if vals && scaleColor}
  <div class="legend-color flex flex-col">
    <div class="legend-color-header flex justify-between px-3">
      <span>0</span>
      <span>Swell-Rating</span>
      <span>4</span>
    </div>
    <div class="legend-color-inner w-full h-3 flex rounded-md overflow-hidden">
      {#each vals as val}
        <div class="flex-1" style:background-color={scaleColor(val)}></div>
      {/each}
    </div>
  </div>
{/if}
