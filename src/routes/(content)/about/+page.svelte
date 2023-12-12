<script lang="ts">
  import AboutPageSocialLink from '$lib/components/AboutPageSocialLink.svelte';
</script>

<div class="container">
  <h1>About</h1>
  <p>
    <!-- Don't forget to update the other number in the Home page! -->
    Hi, I'm Vijay! I have been coding my whole life and working as a professional
    software engineer for over 12 years at some of the best companies in the world.
    I'm primarily a backend engineer although I'm starting to dabble in frontend
    (hence this website). Links to my various profiles can be found below. 
  </p>
  <ul>
    <AboutPageSocialLink network="github" url="https://www.github.com/arnath" />
    <AboutPageSocialLink network="linkedin" url="https://www.linkedin.com/in/vpdev/" />
  </ul>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  ul {
    list-style: none;
  }
</style>
