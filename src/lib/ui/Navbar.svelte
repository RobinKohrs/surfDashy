<script>
  import Hamburger from "$lib/ui/Hamburger.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { SearchIcon } from "lucide-svelte";
  export let showHamburger;
  export let date_display = "";
  export let latest_time_display;
  let selectedOverlay = "none";

  function setSelected(clickedMode) {
    if (clickedMode === selectedOverlay) {
      selectedOverlay = "none";
    } else {
      selectedOverlay = clickedMode;
    }
    dispatch("overlaySelect", selectedOverlay);
  }
</script>

<nav
  class="navbar fixed top-0 inset-x-0 rounded-b-lg text-xl z-[1000] flex justify-between items-stretch max-w-[1080px] mx-auto"
>
  <button
    class="nav h-12 menu bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg"
    on:click={() => setSelected("menu")}
  >
    <Hamburger width={"30px"} ariaExpanded={showHamburger} />
  </button>

  <button
    on:click={() => setSelected("date_picker")}
    class="bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg flex flex-col justify-center"
  >
    <span>{date_display}</span>
    {#if latest_time_display}
      <span class="text-xs">{latest_time_display}</span>
    {/if}
  </button>

  <button
    class="bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg"
    on:click={() => setSelected("search")}
  >
    <SearchIcon />
  </button>
</nav>
