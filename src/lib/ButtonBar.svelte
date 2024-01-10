<script>
  export let options;
  export let selected;
  export let wrap = false;

  function handleClick(o) {
    selected = o.slug;
  }

  let buttonbar;
  let overflow;
  $: if (buttonbar) {
    if (buttonbar.scrollWidth > buttonbar.clientWidth) {
      overflow = true;
    }
  }

  let root;
  $: if (selected) {
    let selector = `.selected_${selected}`;
    let s = document.querySelector(selector);
    // s.scrollIntoView({ behavior: "smooth" });
  }
</script>

<div class="buttonbar__outer relative w-full" bind:this={root}>
  <div
    bind:this={buttonbar}
    class="buttonbar__inner flex gap-1 py-2 relative pr-5"
    class:flex-wrap={wrap}
    class:overflow-scroll={!wrap}
  >
    {#each options as o}
      <button
        on:click={() => handleClick(o)}
        style:background-color={o.slug == selected ? "red" : "white"}
        class="border-black border px-2 py-1"
        class:{`selected_${selected}`}={o.slug == selected}>{o.display}</button
      >
    {/each}
  </div>
  {#if overflow}
    <div
      class="overflow-scroll pointer-events-none absolute right-0 bottom-2 top-2 w-[30%] bg-gradient-to-r from-transparent to-white"
    ></div>
  {/if}
</div>
