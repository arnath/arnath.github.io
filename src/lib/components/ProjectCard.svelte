<script lang="ts">
  import type { Project } from "$lib/types/project";

  export let project: Project;
</script>

<div class="container">
  <strong class="title">{project.name}</strong>
  <div>{project.description}</div>
</div>

<style>

</style>
