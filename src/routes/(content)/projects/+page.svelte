<script lang="ts">
  import projects from "$lib/assets/projects.json";
</script>

<div class="container">
  <h1>Projects</h1>
  <p>
    I really love playing with new languages, frameworks, and technologies. I almost always have
    some kind of project I'm tinkering on. Few of them reach any sort of completion but some of the
    more interesting ones are below.
  </p>
  {#each projects as project}
    <div class="project">
      <a href={project.link}><h3>{project.name}</h3></a>
      <p>{project.description}</p>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .project {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }
</style>
