<script>
  import { imagePath, topics } from "$lib/topics.js";

  let { level, topic = "Animals" } = $props();

  let previewTopic = $derived(topic === "Random" ? "Animals" : topic);
  let pictureCount = $derived(level === 1 ? 1 : level - 1);
  let cells = $derived(level === 2
    ? [topics[previewTopic][0], null]
    : topics[previewTopic].slice(0, pictureCount));
</script>

<div class="level-preview level-{level}" aria-hidden="true">
  {#each cells as item, index (`${item}-${index}`)}
    <span class:empty={item === null}>
      {#if item}
        <img src={imagePath(previewTopic, item)} alt="" />
      {/if}
    </span>
  {/each}
</div>

<style>
  .level-preview { display: grid; gap: 6px; width: 100%; height: 100%; min-height: 0; }
  .level-preview span { min-width: 0; min-height: 0; overflow: hidden; border-radius: 8px; background: #fff; }
  .level-preview img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .level-preview .empty { border: 2px dashed #b8c9c3; background: #f8faf9; }
  .level-2, .level-3 { grid-template-columns: repeat(2, 1fr); }
  .level-4 { grid-template-columns: repeat(3, 1fr); }
  .level-5 { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); }
</style>
