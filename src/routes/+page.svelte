<script>
  import { onMount } from "svelte";
  import PlayScreen from "$lib/components/PlayScreen.svelte";
  import SetupScreen from "$lib/components/SetupScreen.svelte";
  import { preloadCelebrations } from "$lib/game.js";

  // The round the teacher's setup screen already built and preloaded, so the
  // first picture is on screen the moment practice starts.
  let firstRound = $state(null);

  onMount(preloadCelebrations);
</script>

{#if firstRound}
  <PlayScreen first={firstRound} onhome={() => (firstRound = null)} />
{:else}
  <SetupScreen onstart={(round) => (firstRound = round)} />
{/if}
