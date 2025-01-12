<script lang="ts">
  import { base } from "$app/paths";
</script>

<main>
  <div class="title">vijayp.dev</div>
  <div>
    <!-- Don't forget to update the other number in the About page! -->
    Software engineer with over 12 years of experience working on high scale distributed systems
  </div>
  <a class="gap" href="{base}/about">About</a>
  <a href="{base}/blog">Blog</a>
  <a href="{base}/projects">Projects</a>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75em;

    margin: 10vh auto auto auto;
    max-width: 30rem;
    padding: 2em;
  }

  .title {
    color: #0066b2;
    font-size: 48px;
    line-height: 48px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #0066b2;
    font-size: 20px;
  }

  .gap {
    margin-top: 0.5em;
  }
</style>
