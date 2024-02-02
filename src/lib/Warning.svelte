<script>
  import Warning from "./Warning.svelte";
  let windowWidth;
  let show_warning = true;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth < 400}
  {#if show_warning}
    <div
      class="warning fixed z-[4000] w-[90%] px-4 py-4 bg-blue-200 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200%] flex flex-col
    
    "
    >
      <div class="py-4">This website is best seen on desktop...</div>
      <button
        on:click={() => (show_warning = !show_warning)}
        class="close-warning self-center px-2 py-1 rounded-md bg-blue-400"
        >I dont care</button
      >
    </div>
  {/if}
{/if}

<style>
  .warning {
    border: 2px solid cornflowerblue;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  }
  .close-warning {
    border: 2px solid cornflowerblue;
    border-radius: 255px 45px 225px 15px/15px 225px 15px 255px;
  }
</style>
