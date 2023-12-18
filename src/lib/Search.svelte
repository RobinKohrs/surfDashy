<script>
  import { search } from "./../assets/icons.js";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  const dispatch = createEventDispatcher();

  // FUSE
  import Fuse from "fuse.js";

  // icons
  import { clear } from "./../assets/icons";

  export let options;
  export let searchable;
  export let suggestions = [];
  $: console.log("suggestions: ", suggestions);

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

    if (event.key === "Enter") {
      handleSelect();
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
    dispatch("select", item);
  }
</script>

<form class="search-container w-full h-full rounded-lg">
  <label
    class="h-full mb-2 text-lg font-bold text-gray-900 sr-only dark:text-white"
    for="default-search">Search</label
  >
  <div class="search h-full relative">
    <div
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <svg
        class="w-6 h-6 dt:w-8 dt:h-8 text-gray-500 dark:text-gray-400"
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

    <input
      class="rounded-lg overflow-hidden h-full text-2xl block w-full p-4 ps-12 dt:ps-14 pe-12 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type="search"
      id="default-search"
      on:keyup={handleKeyUp}
      autocomplete="off"
      placeholder="Search for surfspot"
      bind:value={search_term}
    />

    <button
      on:click={() => dispatch("closeSearch")}
      class="absolute inset-y-0 end-0 flex items-center pe-3 w-12"
    >
      {@html clear}
    </button>
  </div>

  {#if suggestions.length > 0}
    <ul transition:slide class="suggestions-container my-1">
      {#each suggestions as suggestion, i}
        <li
          class="py-1 suggestion ps-10 pe-10 bg-red-50"
          style:border={selected_index === i
            ? "2px dashed purple"
            : "1px solid rgba(0,0,0,0.1)"}
        >
          <button
            on:click|preventDefault={() => {}}
            class="w-full h-full"
            on:click={() => clickSuggestion(suggestion)}
          >
            {suggestion.item.name}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</form>

<style>
</style>
