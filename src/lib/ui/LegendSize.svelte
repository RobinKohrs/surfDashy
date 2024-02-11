<script>
  export let position = "right";
  export let scaleSize;

  let circles = [{ val: 0.5 }, { val: 6 }];

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
    class="legend-size-container flex w-full h-full items-center justify-center gap-12 px-3"
  >
    {#each circles_computed as circle, i}
      {#if i === 0}
        <span class="relative flex items-center gap-2">
          <span
            style:height={`${circle.r * 2}px`}
            class="rounded-full border border-black aspect-square"
          />
          <span>0.5 m.</span>
          <span
            class="absolute w-8 top-1/2 -translate-y-1/2 border-b border-black right-0 translate-x-[120%]"
          ></span>
        </span>
      {:else}
        <span class="relative flex items-center gap-2">
          <span
            style:height={`${circle.r * 2}px`}
            class="rounded-full border border-black aspect-square"
          />
          <span>6 m.</span>
        </span>
      {/if}
    {/each}
  </div>
{/if}
