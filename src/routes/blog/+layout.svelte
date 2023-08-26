<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
</script>

<NavBar />
<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 60px auto auto auto;
    max-width: 60rem;
    padding-top: 1em;
    padding-bottom: 1em;
  }
</style>
