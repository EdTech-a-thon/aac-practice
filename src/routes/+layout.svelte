<script>
  import "../app.css";
  import { current } from "$lib/i18n/index.svelte.js";

  let { children } = $props();

  // The chosen language belongs to the document, not to one screen, so the
  // welcome, about and privacy pages read in it too — and a right-to-left
  // language mirrors the whole site rather than just the practice grid.
  $effect(() => {
    document.documentElement.lang = current().speech;
    document.documentElement.dir = current().dir;
  });
</script>

{@render children()}
