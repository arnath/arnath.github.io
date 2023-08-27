<header>
  <div class="container">
    <a class="title" href="#top">vijayp.dev</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
    <a href="/projects">Projects</a>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 1em 0;

    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: baseline;
    gap: 1em;
    
    max-width: 50rem;
    width: 100%;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    color: #0066b2;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 0.5em;
  }
</style>
