<script>
  import { createEventDispatcher } from "svelte";
  import { slide, fly } from "svelte/transition";
  const dispatch = createEventDispatcher();

  // FUSE
  import Fuse from "fuse.js";

  import { clickOutside } from "$lib/utils";

  export let options;
  export let searchable;
  export let suggestions = [];
  export let show_search;

  let search_term;

  function clearSuggestions(e) {
    suggestions = [];
    search_term = "";
  }

  let fuse;
  $: if (searchable) {
    fuse = new Fuse(searchable, options);
  }

  // the current selcted item
  let selected_index = undefined;

  // function to call a function with delay
  const debounce = function (fn, delay = 1000) {
    let timerId = null;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  function searchFn() {
    // get the suggestions
    suggestions = fuse.search(search_term).slice(0, 5);
  }

  // debounce the handling of key events
  const debouncedSearch = debounce(searchFn, 300);

  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      clickSuggestion(suggestions[selected_index]);
    }

    if (search_term === "") {
      suggestions = [];
      selected_index = undefined;
      return;
    }

    if (event.key === "ArrowUp") {
      moveUp();
    }

    if (event.key === "ArrowDown") {
      moveDown();
    }

    debouncedSearch();
  }

  function moveUp() {
    selected_index = Math.max(0, selected_index - 1);
  }

  function moveDown() {
    if (selected_index === undefined) {
      selected_index = 0;
      return;
    }
    selected_index = Math.min(suggestions.length - 1, selected_index + 1);
  }

  function clickSuggestion({ item }) {
    dispatch("selectSearch", item);
    suggestions = [];
  }
</script>

<form
  class="search-container w-full h-full rounded-lg z-[3000]"
  action="javascript:void(0);"
  use:clickOutside={() => (show_search = !show_search)}
>
  <label
    class="h-full mb-2 text-lg font-bold text-gray-900 sr-only dark:text-white"
    for="default-search">Search</label
  >
  <div class="search h-full relative">
    <input
      spellcheck="false"
      autofocus
      class="{suggestions.length > 0
        ? 'rounded-t-lg'
        : 'rounded-lg'} bg-transparent overflow-hidden h-full text-2xl block w-full p-4 pe-12 dt:pe-14 text-gray-900 outline-none"
      on:keyup={handleKeyUp}
      autocomplete="off"
      placeholder="Search for surfspot"
      bind:value={search_term}
    />
    <div
      class="absolute inset-y-0 end-0 flex w-16 items-center justify-center pointer-events-none"
    >
      <svg
        tabindex="-1"
        class="w-10 p-2 aspect-square text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  </div>

  {#if suggestions.length > 0}
    <ul
      transition:fly
      id="menu"
      role="menu"
      class="suggestions-container my-1 rounded-b-lg overflow-hidden"
    >
      {#each suggestions as suggestion, i}
        <li
          class="w-full h-full bg-white p-4 py-1 border text-lg hover:bg-red-200 {i ===
          4
            ? 'rounded-b-lg'
            : ''}"
          style:background={selected_index === i ? "cornflowerblue" : "white"}
          style:border={selected_index === i ? "2px solid black" : ""}
        >
          <button
            class="w-full h-full"
            on:click={() => {
              clickSuggestion(suggestions[i]);
            }}
          >
            {suggestion.item.name}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</form>

<style>
  input {
    transition: all 500ms;
  }
</style>
