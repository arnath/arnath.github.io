<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  console.log(data);
</script>

<h1>{data.title}</h1>
<div>{data.date}</div>
<svelte:component this={data.content} />
