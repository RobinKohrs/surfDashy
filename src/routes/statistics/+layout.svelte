<script>
  import Hamburger from "$lib/ui/Hamburger.svelte";
  import { Settings } from "lucide-svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import Overlay from "$lib/ui/Overlay.svelte";

  let selectedOverlay = "none";
  $: ariaExpanded = selectedOverlay === "menu";
  function setSelected(clickedMode) {
    console.log("clickedMode: ", clickedMode, selectedOverlay);
    if (clickedMode === selectedOverlay) {
      selectedOverlay = "none";
    } else {
      selectedOverlay = clickedMode;
    }
  }
</script>

<nav
  class="h-12 navbar fixed top-0 inset-x-0 px-2 text-xl z-[1000] max-w-[1080px] mx-auto flex justify-around items-center"
>
  <button
    on:click={() => {
      console.log("in the hamburger click");
      setSelected("menu");
    }}
    class="nav menu h-full w-12 grid place-items-center"
  >
    <Hamburger width={"20px"} {ariaExpanded} />
  </button>
  <h1 class="">Statistics</h1>
  <button
    on:click={() => setSelected("settings")}
    class="nav settings h-full w-12 grid place-items-center"
  >
    <Settings class="h-12" />
  </button>
</nav>

<!-- for any potential overlay (Menu, Dates, Search) -->
<div class="overlay-container w-full pt-14 fixed z-[000]">
  {#if selectedOverlay !== "none"}
    <Overlay on:clickOutside={() => (selectedOverlay = "none")}>
      {#if selectedOverlay === "menu"}
        <Menu />
      {:else if selectedOverlay === "settings"}
        settings
      {/if}
    </Overlay>
  {/if}
</div>

<!-- use padding so not collaping margins -->
<div class="container statistics pt-14 max-w-[1080px] mx-auto px-2 z-[0]">
  <slot />
</div>
