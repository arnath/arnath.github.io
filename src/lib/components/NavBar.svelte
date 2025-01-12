<script lang="ts">
  import { base } from "$app/paths";
</script>

<header>
  <a class="title" href="{base}/">vijayp.dev</a>
  <a href="{base}/about">About</a>
  <a href="{base}/blog">Blog</a>
  <a href="{base}/projects">Projects</a>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 1rem 0;
    background-color: #edf2f8;
    font-size: 20px;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: baseline;
    gap: 1em;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
  }
</style>
