<script>
  import SizeLegend from "./sizeLegend.svelte";
  export let min = 10;
  export let max = 20;
  //   export let scale;
</script>

<div class="sizelegend__container flex gap-4 items-center">
  <div class="min__container">
    <span>{min}</span>
    <span
      class="inline-block"
      style="height: {min *
        2}px; aspect-ratio: 1; border: 1px solid black; border-radius: 100%;"
    ></span>
  </div>
  <div class="max__container">
    <span
      class="inline-block"
      style="height: {max *
        2}px; aspect-ratio: 1; border: 1px solid black; border-radius: 100%;"
    ></span>
    <span>{max}</span>
  </div>
</div>

<style>
  .sizelegend__container > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
