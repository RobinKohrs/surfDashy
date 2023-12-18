<script>
  export let width = "100px";
  export let height = "50px";
  let checked;
  $: console.log("checked: ", checked);
</script>

<input class="h-0 w-0 hidden peer" type="checkbox" id="switch" bind:checked />
<label
  style:width
  style:height
  class="
    peer-checked:after:left-[calc(100%-5px)] peer-checked:after:-translate-x-full peer-checked:bg-red-200 cursor-pointer indent-[-9999px] bg-slate-500 block rounded-full relative after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[40px] after:h-[40px] after:bg-white after:rounded-[40px] after:transition-all after:duration-300"
  for="switch">Toggle</label
>

<style>
  /* what does this do? */
  label:active:after {
    width: 10px;
  }
</style>
