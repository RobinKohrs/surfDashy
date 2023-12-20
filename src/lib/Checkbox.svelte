<script>
  import { onMount } from "svelte";
  export let width = "100px";
  export let height = "50px";
  export let value_unselected = "unchecked";
  export let value_selected = "checked";
  export let color_unselected = "cornflowerblue";
  export let color_selected = "#F6CEFC";
  export let selected = "checked";

  let checked;
  // $: if (selected == value_selected) {
  //   selected = value_selected;
  //   checked = true;
  // } else {
  //   selected = value_unselected;
  //   checked = false;
  // }

  $: if (!checked) {
    selected = value_unselected;
    checked = false;
  } else {
    selected = value_selected;
    checked = true;
  }
  let checkbox_container;
  $: if (checkbox_container) {
    checkbox_container.style.setProperty(
      "--color_unselected",
      color_unselected
    );
    checkbox_container.style.setProperty("--color_selected", color_selected);
  }
</script>

<div
  class="checkbox-container flex items-center gap-2"
  bind:this={checkbox_container}
>
  <div
    class="label_unchecked"
    class:underline={selected === value_unselected}
    style:color={selected === value_unselected ? color_unselected : "gray"}
    style:font-weight={selected === value_unselected ? "900" : "200"}
  >
    {value_unselected}
  </div>
  <div class="slider">
    <input
      class="h-0 w-0 hidden peer"
      type="checkbox"
      id="switch"
      bind:checked
    />
    <label
      style:width
      style:height
      class="
    peer-checked:after:left-[calc(100%-5px)] peer-checked:after:-translate-x-full cursor-pointer indent-[-9999px] bg-slate-500 block rounded-full relative after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[40px] after:h-[40px] after:bg-white after:rounded-[40px] after:transition-all after:duration-300"
      for="switch">Toggle</label
    >
  </div>
  <div
    class="label_checked"
    class:underline={selected === value_selected}
    style:color={selected === value_selected ? color_selected : "gray"}
    style:font-weight={selected === value_selected ? "900" : "200"}
  >
    {value_selected}
  </div>
</div>

<style>
  /* what does this do? */
  label:active:after {
    width: 10px;
  }

  label {
    background-color: var(--color_unselected);
  }

  input:checked + label {
    background-color: var(--color_selected);
  }
</style>
