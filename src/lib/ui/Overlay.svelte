<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { clickOutside } from "$lib/utils";
  export let selectedOverlay;
  export let classList = ["p-2", "bg-red-300"];

  let overlayContainer;
  $: if (overlayContainer) {
    if (classList.length > 0) {
      classList.forEach((c) => {
        overlayContainer.classList.add(c);
      });
    }
  }
</script>

<div
  bind:this={overlayContainer}
  use:clickOutside={() => {
    dispatch("clickOutside");
  }}
  class="overlay absolute left-0 right-0 bg-[rgba(255,255,255,.8)] w-[95%] mx-auto max-w-[1080px] rounded-xl z-[4000]"
>
  <div class="overlayContainer__inner bg-[rgba(255,255,255,.8)] p-2 rounded-xl">
    <slot />
  </div>
</div>
