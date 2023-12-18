<script>
  import Checkbox from "./Checkbox.svelte";
  export let dialog_open;
  let dialog_container;

  $: if (dialog_open) {
    dialog_container.showModal();
  }
</script>

<div
  class="z-10 modal-container fixed inset-0 grid place-items-center pointer-events-none"
>
  <dialog
    class="p-4 rounded-lg pointer-events-auto"
    bind:this={dialog_container}
  >
    <h1 class="text-2xl">Settings</h1>
    <Checkbox />
  </dialog>
</div>

<style>
  ::backdrop {
    backdrop-filter: blur(10px);
  }
</style>
