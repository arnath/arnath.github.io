<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  function getLocalizedDateString(date: string): string {
    const dateString = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return dateString;
  }
</script>

<div class="container">
  <h1>Blog</h1>
  <p>
    I don't write often but I like to make posts about things that I found
    hard to Google when I had to look them up. The topics will vary although
    almost all are tech-related. 
  </p>
  <br />

  {#each data.posts as post}
  <div class="post">
    <a href={`/blog/${post.slug}`}><h3>{post.title}</h3></a>
    <div class="subtext">{getLocalizedDateString(post.date)}</div>
  </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .post {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-bottom: 1em;
  }
</style>

