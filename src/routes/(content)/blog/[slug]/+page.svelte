<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const dateString = new Date(data.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
</script>

<h1>{data.title}</h1>
<div class="subtext">{dateString}</div>
<svelte:component this={data.content} />
