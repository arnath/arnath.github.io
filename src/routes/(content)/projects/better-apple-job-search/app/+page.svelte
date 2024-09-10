<script lang="ts">
  import Grid from "gridjs-svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import type { Config } from "gridjs";
  import type { Job } from "$lib/types";

  export let data: PageData;

  const gridConfig: Partial<Config> = {
    data: data.jobs,
    pagination: true,
    search: false,
    sort: true,
    columns: [
      {
        id: "postDate",
        name: "Post Date",
        formatter: (cell: string) => cell.substring(0, 10),
      },
      {
        id: "title",
        name: "Job Title",
        width: "40%",
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
    ]
  };
</script>

<div class="container">
  <h1>Better Apple Job Search: App</h1>
  <form method="POST" use:enhance>
    <input type="search" />
  </form>
  <div class="grid">
    <Grid {...gridConfig} />
  </div>
</div>

<style>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .grid {
    margin-left: -25%;
    margin-right: -25%;
  }
</style>
