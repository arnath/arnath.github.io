<script lang="ts">
    import { base } from "$app/paths";
    import SocialIcons from "@rodneylab/svelte-social-icons";
</script>

<header>
    <div class="left">
        <a class="title" href="{base}/">vijayp.dev</a>
        <a href="{base}/blog">Blog</a>
        <a href="{base}/projects">Projects</a>
    </div>
    <div class="right">
        <a href="https://github.com/arnath"
            ><SocialIcons network="github" width="28" height="28" /></a>
        <a href="https://www.linkedin.com/in/vpdev"
            ><SocialIcons network="linkedin" width="28" height="28" /></a>
    </div>
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
        justify-content: space-between;
        align-items: center;
    }

    .left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: baseline;
        gap: 1em;
    }

    .right {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        gap: 1em;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
    }
</style>
