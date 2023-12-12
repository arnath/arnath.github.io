<script lang="ts">
  import SocialIcons from "@rodneylab/svelte-social-icons";
  import type { SocialIconsProps } from "@rodneylab/svelte-social-icons/types/SocialIcons.svelte";

  export let network: SocialIconsProps["network"];
  export let url: string;
</script>

<li>
  <a href={url}>
    <SocialIcons {network} />
    <span>{url}</span>
  </a>
</li>

<style>
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }

  li {
    margin-bottom: 1em;
  }
</style>
