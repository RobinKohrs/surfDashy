<script>
  export let options; // for multiple options
  export let on = false; // for single option
  export let selected;
  export let wrap = false;
  export let color_on = "cornflowerblue";

  function handleClick(o) {
    selected = o.id;
  }

  let buttonbar;
  let overflow;
  $: if (buttonbar) {
    if (buttonbar.scrollWidth > buttonbar.clientWidth) {
      overflow = true;
    }
  }

  let root;
  $: if (selected && buttonbar && overflow) {
    let selector = `.selected_${selected}`;
    let s = document.querySelector(selector);
    if (s) {
      s.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
</script>

<div class="buttonbar__outer relative" bind:this={root}>
  <div
    bind:this={buttonbar}
    class="buttonbar__inner flex gap-1 py-2 relative pr-5"
    class:flex-wrap={wrap}
    class:overflow-scroll={!wrap}
  >
    {#if options.length > 1}
      {#each options as o}
        <button
          on:click={() => handleClick(o)}
          style:background-color={o.id == selected ? color_on : "white"}
          class="border-black border px-2 py-1 {o.id === selected
            ? `selected_${selected}`
            : ''}">{o.display}</button
        >
      {/each}
    {:else}
      <button
        on:click={() => (on = !on)}
        style:background-color={on ? color_on : "rgba(0,0,0,.1)"}
        class="border-black border px-2 py-1">{options[0].display}</button
      >
    {/if}
  </div>
  <!-- {#if overflow}
    <div
      class="overflow-scroll pointer-events-none absolute right-0 bottom-2 top-2 w-[30%] bg-gradient-to-r from-transparent to-white"
    ></div>
  {/if} -->
</div>
