<script lang="ts">
  import projects from '$lib/assets/projects.json';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<h1>Projects</h1>
<p>
I really love playing with new languages, frameworks, and technologies. I
almost always have some kind of project I'm tinkering on. Few of them reach
any sort of completion but some of the more interesting ones are below.
</p>
<div class="grid">
{#each projects as project}
  <ProjectCard {project} />
{/each}
</div>

<style>
  h1, p {
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    justify-content: center;
    gap: 1.5rem;
    padding: 0 1rem;
  }
</style>
