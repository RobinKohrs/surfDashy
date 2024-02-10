<script>
  export let position = "right";
  export let scaleSize;

  let circles = [{ val: 0.1 }, { val: 4 }];

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
    class="legend-size-container flex w-full h-full items-center justify-center gap-4"
    bind:clientWidth={svgLegendWidth}
  >
    {#each circles_computed as circle, i}
      <div class="legend item flex items-center gap-2">
        {#if i === 0}
          <span>0</span>
        {/if}
        <span
          style:height={`${circle.r * 2}px`}
          class="rounded-full bg-black aspect-square inline-block"
        >
        </span>
        {#if i === 0}
          <span class="underline">Swell-Rating</span>
        {/if}
        {#if i === 1}
          <span>4</span>
        {/if}
      </div>
    {/each}
  </div>
{/if}
