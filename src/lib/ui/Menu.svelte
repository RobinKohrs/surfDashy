<script>
  export let menuoptions = [
    {
      display: "Map",
      route: "/",
    },
    {
      display: "Statistics",
      route: "statistics",
    },
    {
      display: "Global settings",
      route: "settings",
    },
    {
      display: "About",
      route: "about",
    },
  ];
</script>

<ul class="flex flex-col">
  {#each menuoptions as option, i}
    <li class="hover:bg-gray-200 rounded-md">
      <a class="py-3 block underline text-center" href={option.route}
        >{option.display}</a
      >
    </li>
  {/each}
</ul>
