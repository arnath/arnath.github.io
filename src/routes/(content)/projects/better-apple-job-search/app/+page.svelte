<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";
    import type { Job } from "$lib/types";
    import Grid, {
        type GridColumnDefinition,
    } from "$lib/components/Grid.svelte";

    export let data: PageData;
    let queryString = "";

    let columns: GridColumnDefinition[] = [
        {
            dataName: "postDate",
            displayName: "Post Date",
            isSortable: true,
        },
        {
            dataName: "title",
            displayName: "Job Title",
            isSortable: true,
        },
        {
            dataName: "teamName",
            displayName: "Team Name",
            isSortable: true,
        },
        {
            dataName: "locations",
            displayName: "Locations",
            isSortable: true,
            converter: (data) => data.join("\n"),
        },
        {
            dataName: "isRemote",
            displayName: "Remote OK?",
            isSortable: false,
            converter: (data) => (data ? "Yes" : "No"),
        },
    ];
</script>

<div class="container">
    <h1>Better Apple Job Search: App</h1>
    <form method="POST" use:enhance>
        <div class="search-row">
            <input
                type="search"
                name="queryString"
                class="search-bar"
                placeholder="Enter query string ..."
                bind:value={queryString} />
            <!-- <button><FilterCogOutline size="24px" /></button> -->
            <input type="submit" value="Search" />
        </div>
    </form>
    <div class="grid">
        <Grid {columns} data={data.jobs} />
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

    input[type="checkbox"] {
        width: 24px;
        height: 24px;
    }

    .grid {
        margin-left: -25%;
        margin-right: -25%;
    }

    .grid:hover {
        cursor: pointer;
    }
</style>
