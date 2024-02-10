<script>
  export let position = "right";
  export let scaleSize;

  let circles = [{ val: 0.1 }, { label: "Wave Height", val: 0 }, { val: 4 }];

  let svgLegendWidth;
  let circles_computed;
  let height;
  $: if (scaleSize) {
    circles_computed = circles.map((c) => {
      return {
        ...c,
        r: Math.pow(scaleSize(c.val), 0.5),
      };
    });

    height = Math.max(...circles_computed.map((c) => c.r));
  }
</script>

{#if height}
  <div
    class="legend-size-container flex w-full h-full items-center justify-between px-3"
    bind:clientWidth={svgLegendWidth}
  >
    {#each circles_computed as circle, i}
      <div class="legend item flex items-center gap-2">
        {#if i === 0}
          <span class="relative flex items-center ml-16">
            <span>0</span>
            <span
              style:height={`${circle.r * 2}px`}
              class="rounded-full bg-black aspect-square absolute translate-x-full ml-2"
            />
          </span>
        {:else if i === 1}
          <span>{circle.label}</span>
        {:else}
          <span class="relative flex items-center mr-16">
            <span>4</span>
            <span
              style:height={`${circle.r * 2}px`}
              class="rounded-full border border-black aspect-square absolute -translate-x-[120%]"
            />
          </span>
        {/if}
      </div>
    {/each}
  </div>
{/if}
