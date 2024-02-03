<script>
  export let ariaExpanded = false;
  export let width;
  export let color = "black";
  export let strokeWidth = 10;
</script>

<svg
  class="button hamburger"
  class:open={ariaExpanded}
  aria-expanded={ariaExpanded}
  style:width
  viewBox="0 0 100 100"
>
  {#each Array(3) as l, i}
    {@const y = i * 25 + 25}
    {@const x1 = 5}
    {@const x2 = 95}

    <line
      class="line line-{i}"
      {x1}
      {x2}
      y1={y}
      y2={y}
      stroke={color}
      stroke-width={strokeWidth}
    />
  {/each}
</svg>

<style>
  .line {
    transition: 300ms linear;
    transform-origin: center;
  }
  :global(svg.open) {
    & .line-0 {
      transform: rotate(45deg) translateY(25px);
    }

    & .line-1 {
      display: none;
    }

    & .line-2 {
      transform: rotate(-45deg) translateY(-25px);
    }
  }
</style>
