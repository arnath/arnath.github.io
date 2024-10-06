<script lang="ts">
  import "../../app.css";
  import NavBar from "$lib/components/NavBar.svelte";
</script>

<main>
  <NavBar />
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-width: 60%;
    margin: auto auto 4rem;
    padding: 0 1.5rem;
  }
</style>
