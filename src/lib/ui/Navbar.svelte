<script>
  import Hamburger from "$lib/ui/Hamburger.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { SearchIcon } from "lucide-svelte";
  export let showHamburger;
  export let date_display = "";
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
  class="h-12 navbar fixed top-0 inset-x-0 rounded-b-lg text-xl z-[1000] flex justify-between items-stretch max-w-[1080px] mx-auto"
>
  <button
    class="nav menu h-full w-12 bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg"
    on:click={() => setSelected("menu")}
  >
    <Hamburger width={"100%"} ariaExpanded={showHamburger} />
  </button>

  <button
    on:click={() => setSelected("date_picker")}
    class="bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg"
  >
    {date_display}
  </button>

  <button
    class="bg-[rgba(255,255,255,.7)] px-2 rounded-b-lg"
    on:click={() => setSelected("search")}
  >
    <SearchIcon />
  </button>
</nav>
