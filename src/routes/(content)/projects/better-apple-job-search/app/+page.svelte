<script lang="ts">
  import SvelteGrid from "gridjs-svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import type { Config, Grid } from "gridjs";
  import type { Job } from "$lib/types";

  export let data: PageData;
  let gridInstance: Grid | undefined;
  let queryString = "";
  let caseSensitive = false;

  // For some reason, the Svelte binding for this event doesn't expose the row.
  $: gridInstance?.on("rowClick", (_, r) => window.open(r.cell(0).data as string));

  const gridConfig: Partial<Config> = {
    data: data.jobs,
    pagination: true,
    search: false,
    sort: true,
    columns: [
      // We expose this as a hidden column so it can be used in the rowClick handler.
      {
        id: "link",
        hidden: true,
      },
      {
        id: "postDate",
        name: "Post Date",
        formatter: (cell: string) => cell.substring(0, 10),
      },
      {
        id: "title",
        name: "Job Title",
        width: "30%",
      },
      {
        id: "teamName",
        name: "Team Name",
      },
      {
        id: "locations",
        name: "Locations",
        data: (row: Job) => {
          // The fetcher stores this array as a JSON string.
          const locations: string[] = JSON.parse(row.locations);
          return locations.join("\n");
        }
      },
      {
        id: "isRemote",
        name: "Remote OK?",
        formatter: (cell: number) => cell ? "Yes" : "No",
      },
    ],
  };
</script>

<div class="container">
  <h1>Better Apple Job Search: App</h1>
  <form method="POST" use:enhance>
    <div class="search-row">
      <input type="search" name="queryString" class="search-bar" placeholder="Enter query string ..." bind:value={queryString} />
      <!-- <button><FilterCogOutline size="24px" /></button> -->
      <input type="submit" value="Search" />
    </div>
    <div class="case-sensitive-option">
      <input type="checkbox" id="case-sensitive" name="caseSensitive" bind:checked={caseSensitive} />
      <label for="case-sensitive">Case Sensitive?</label>
    </div>
  </form>
  <div class="grid">
    <SvelteGrid {...gridConfig} bind:instance={gridInstance}/>
  </div>
</div>

<style>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .search-row {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .search-bar {
    flex-grow: 1;
  }

  .case-sensitive-option {
    display: flex;
    direction: row;
    gap: 0.25em;
    align-items: center;
  }

  input[type='checkbox'] {
    width: 24px;
    height: 24px;
  }

  .grid {
    margin-left: -25%;
    margin-right: -25%;
  }

  .grid:hover {
    cursor: pointer
  }
</style>
