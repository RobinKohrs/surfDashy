<script>
  import Hamburger from "$lib/ui/Hamburger.svelte";
  import { Settings, Map } from "lucide-svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import Overlay from "$lib/ui/Overlay.svelte";

  let selectedOverlay = "none";
  $: ariaExpanded = selectedOverlay === "menu";
  function setSelected(clickedMode) {
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
  <h1 class="">Settings</h1>
  <button
    on:click={() => setSelected("settings")}
    class="nav settings h-full w-12 grid place-items-center"
  >
    <a href="/"><Map /></a>
  </button>
</nav>

<!-- for any potential overlay (Menu, Dates, Search) -->
<div class="overlay-container w-full pt-14 fixed z-[100]">
  {#if selectedOverlay !== "none"}
    <Overlay
      on:clickOutside={() => {
        setTimeout(() => {
          selectedOverlay = "none";
        }, 50);
      }}
      {selectedOverlay}
    >
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

<style>
  .container {
    --gap: clamp(1rem, 6vw, 3rem);
    --full: minmax(var(--gap), 1fr);
    --content: min(50ch, 100% - var(--gap) * 2);
    --popout: minmax(0, 2rem);
    --feature: minmax(0, 5rem);

    display: grid;
    grid-template-columns:
      [full-start] var(--full)
      [feature-start] var(--feature)
      [popout-start] var(--popout)
      [content-start] var(--content) [content-end]
      var(--popout) [popout-end]
      var(--feature) [feature-end]
      var(--full) [full-end];

    & > * {
      grid-column: content;
    }
    & .popout {
      grid-column: popout;
    }
    & .feature {
      grid-column: feature;
    }
    & .full {
      grid-column: full;
      background-color: #555;
      color: white;
      padding-inline: 0.5rem;
      border-radius: 0.2rem;
      margin-top: 10px;
      text-align: center;
    }
  }
</style>
