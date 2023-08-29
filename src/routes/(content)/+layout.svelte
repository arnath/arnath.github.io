<script lang="ts">
  import "../../app.css";
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
    max-width: 45rem;
    padding: 1em 0 4em;
  }
</style>
