<script lang="ts">
  import { base } from "$app/paths";
</script>

<header>
  <div class="container">
    <a class="title" href="{base}/">vijayp.dev</a>
    <a href="{base}/about">About</a>
    <a href="{base}/blog">Blog</a>
    <a href="{base}/projects">Projects</a>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 1em 0;
    background-color: #EDF2F8;

    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: baseline;
    gap: 1em;
    
    max-width: 45rem;
    width: 100%;
    font-size: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
  }
</style>
