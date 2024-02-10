<script>
  import LegendSize from "./LegendSize.svelte";
  import LegendColor from "./LegendColor.svelte";
  export let position = "bottom";
  export let scaleSize;
  export let scaleColor;

  function changePosition() {
    if (position === "right") {
      position = "bottom";
    } else {
      position = "right";
    }
  }
</script>

<!-- <button class="fixed top-10 left-1/2 z-[2000]" on:click={changePosition}
  >move position</button
> -->

<div
  class="legend-container absolute
  {position === 'right' ? 'left-full' : 'bottom-0'}
   {position === 'right'
    ? 'w-0 h-[400px] max-h-full'
    : 'max-w-[500px] w-full h-0'} 
    {position === 'right' ? 'bottom-1/2' : 'left-1/2'} 
    {position === 'right' ? 'translate-y-1/2' : '-translate-x-1/2'} z-[10000]"
>
  <div
    style={position === "right"
      ? "grid-template-columns: 1fr 1fr"
      : "grid-template-rows: 40px 40px"}
    class="legend-container__inner p-2 absolute bg-[rgba(255,255,255,.7)] rounded-md grid gap-1
    {position === 'right'
      ? '-translate-x-full h-full'
      : '-translate-y-full  w-full'}"
  >
    <LegendSize {scaleSize} />
    <LegendColor {scaleColor} />
  </div>
</div>

<style>
  .legend-container {
    --transition-duration: 500ms;
    transition: bottom var(--transition-duration);
  }
</style>
