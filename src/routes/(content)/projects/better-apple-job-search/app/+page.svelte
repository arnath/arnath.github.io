<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="container">
  <h1>Better Apple Job Search: App</h1>
  <form method="POST" use:enhance>
    <input type="search" />
  </form>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
