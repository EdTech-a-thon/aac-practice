<script>
  // A translated sentence with links written into it. See segments() in
  // $lib/i18n — `links` maps the name inside `[words](name)` to its href.
  import { segments } from "$lib/i18n/index.svelte.js";

  let { key, values = {}, links = {} } = $props();
</script>

{#each segments(key, values) as part}{#if part.link}<a
      href={links[part.link]}
      target={links[part.link]?.startsWith("http") ? "_blank" : null}
      rel={links[part.link]?.startsWith("http") ? "noopener noreferrer" : null}
    >{part.text}</a>{:else}{part.text}{/if}{/each}
