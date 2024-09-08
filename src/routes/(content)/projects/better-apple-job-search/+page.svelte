<script lang="ts">
</script>

<div class="container">
  <h1>Better Apple Job Search: Introduction</h1>
  <p>
    I've been doing a lot of job searching recently. I would love to apply to
    some jobs at Apple but I find their careers website infuriating to use. The
    search is awful and the filters can't be combined in any useful ways. This
    project is my attempt to fix some of those things.
  </p>
  <h2>Quick Links</h2>
  <ul>
    <li>App</li>
    <li>Blog post</li>
    <li><a href="https://github.com/arnath/better-apple-job-search">Github</a></li>
    <li>SQLite DB with jobs data</li>
  </ul>
  <br>
  <h2>Anatomy of an Apple listing</h2>
  <p>
    After some translation from Apple's system into my SQLite database, the
    fields in each listing are the following:
  </p>
  <ul>
    <li>
      <code>id</code> - The ID of the listing in Apple's system, prepended with `apple_`
      to be future-proof.
    </li>
    <li>
      <code>link</code> - Attempts to provide a link to the listing. This is constructed
      best-effort.
    </li>
    <li>
      <code>postDate</code> - The timestamp in GMT when the listing was posted.
    </li>
    <li><code>title</code> - Title of the listing.</li>
    <li><code>summary</code> - Job description for the listing.</li>
    <li>
      <code>teamName</code> - Apple organization name that this job belongs to.
    </li>
    <li>
      <code>locations</code> - List of available locations, each in the form "locationName,
      countryName" (e.g., "San Diego, United States").
    </li>
    <li>
      <code>isRemote</code> - Indicates whether or not the role allows working remotely.
    </li>
  </ul>
  <br>
  <h2>How it Works</h2>
  <p>
    The app below allows you to specify search queries as well as a set of
    configurable filters. The search string is queried using full text search
    against the <code>title</code> and <code>summary</code> fields. The filters
    allow you to include or exclude values from the <code>teamName</code>,
    <code>locations</code>, and <code>isRemote</code> fields.
  </p>
  <p>
    The app searches against the query string and then filters the results by
    the set of filters. Include filters are combined using <code>OR</code> logic
    and exclude filters are combined using <code>AND</code> logic.
  </p>
  <br>
  <h3 class="app-link"><a href="/projects/better-apple-job-search/app">Go to the App</a></h3>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .app-link {
    text-align: center;
  }
</style>
