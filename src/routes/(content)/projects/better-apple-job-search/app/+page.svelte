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
            textAlign: "center",
            width: "13%",
        },
        {
            dataName: "title",
            displayName: "Job Title",
            isSortable: true,
            textAlign: "left",
            width: "auto",
        },
        {
            dataName: "teamName",
            displayName: "Team Name",
            isSortable: true,
            textAlign: "left",
            width: "20%",
        },
        {
            dataName: "locations",
            displayName: "Locations",
            isSortable: true,
            converter: (data) => data.join("\n"),
            textAlign: "left",
            width: "20%",
        },
        {
            dataName: "isRemote",
            displayName: "Remote",
            isSortable: false,
            converter: (data) => (data ? "Yes" : "No"),
            textAlign: "center",
            width: "10%",
        },
    ];
</script>

<div class="container">
    <h1>Better Apple Job Search: App</h1>
    <form method="GET">
        <div class="search-row">
            <input
                type="search"
                name="queryString"
                class="search-bar"
                placeholder="Enter query string ..."
                bind:value={queryString} />
            <input type="submit" value="Search" />
        </div>
    </form>
    <div class="grid">
        <Grid {columns} data={data.jobs} />
    </div>
</div>

<style>
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
</style>
