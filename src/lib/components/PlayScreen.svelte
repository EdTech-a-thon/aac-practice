<script>
  import { onMount, tick } from "svelte";
  import Celebration from "./Celebration.svelte";
  import HomeDialog from "./HomeDialog.svelte";
  import { celebrations, createRound, preloadRound, randomItem } from "$lib/game.js";
  import { settings } from "$lib/settings.svelte.js";
  import { imagePath, titleCase } from "$lib/topics.js";
  import { cancelSpeech, exitFullscreen, speak } from "$lib/screen.js";
  import { current, promptFor, t, wordLabel } from "$lib/i18n/index.svelte.js";

  let { first, onhome } = $props();

  // A session stays on one topic, even when the teacher picked Random.
  const gameTopic = first.topic;

  let round = $state(first);
  let hintIndex = $state(-1);
  let effect = $state(null);
  let homeOpen = $state(false);

  let nextRound;
  let choicesEl;
  let hintTimer;
  let celebrationTimer;

  let prompt = $derived(promptFor(round.correct));

  function milliseconds(value) {
    const seconds = Math.min(30, Math.max(1, Number(value) || 5));
    return seconds * 1000;
  }

  function clearTimers() {
    window.clearTimeout(hintTimer);
    window.clearTimeout(celebrationTimer);
    cancelSpeech();
  }

  function beginRound(next) {
    clearTimers();
    round = next;
    hintIndex = -1;
    effect = null;
    nextRound = createRound(gameTopic, settings.level);
    preloadRound(nextRound);
    speak(promptFor(next.correct), current().speech);
    if (settings.hintEnabled) {
      hintTimer = window.setTimeout(showHint, milliseconds(settings.hintSeconds));
    }
  }

  // Dropping the class and forcing a reflow before re-adding it restarts the
  // wiggle, so a second wrong tap is answered with a fresh nudge.
  async function showHint() {
    hintIndex = -1;
    await tick();
    void choicesEl?.offsetWidth;
    hintIndex = round.choices.indexOf(round.correct);
  }

  function goHome() {
    exitFullscreen();
    onhome();
  }

  function choose(choice) {
    if (choice === round.correct) celebrate();
    else showHint();
  }

  function celebrate() {
    clearTimers();
    if (!settings.rewardEnabled) {
      beginRound(nextRound ?? createRound(gameTopic, settings.level));
      return;
    }
    effect = randomItem(celebrations);
    celebrationTimer = window.setTimeout(() => {
      beginRound(nextRound ?? createRound(gameTopic, settings.level));
    }, milliseconds(settings.rewardSeconds));
  }

  onMount(() => {
    beginRound(first);
    return clearTimers;
  });
</script>

<main class="play-page level-{settings.level}" style:--picture-background={settings.pictureBackground}>
  <button class="home-button" aria-label={t("play.homeLabel")} onclick={() => (homeOpen = true)}>{t("play.home")}</button>

  <div class="round" aria-live="polite">
    <p class="prompt">{prompt}</p>
    <div class="choices" role="group" aria-label={prompt} bind:this={choicesEl}>
      {#each round.choices as choice, index (index)}
        {#if choice === null}
          <button class="choice blank-choice" aria-label={t("play.emptyChoice")} onclick={() => choose(null)}></button>
        {:else}
          <button
            class="choice"
            class:helpful={hintIndex === index}
            aria-label={titleCase(wordLabel(choice))}
            onclick={() => choose(choice)}
          >
            <img src={imagePath(round.topic, choice)} alt={titleCase(wordLabel(choice))} />
            {#if settings.showPictureNames}
              <span class="picture-name">{titleCase(wordLabel(choice))}</span>
            {/if}
          </button>
        {/if}
      {/each}
    </div>
  </div>

  {#if homeOpen}
    <HomeDialog onstay={() => (homeOpen = false)} onhome={goHome} />
  {/if}

  {#if effect}
    <Celebration {effect} />
  {/if}
</main>

<style>
  .play-page { min-height: 100svh; background: #eef5f2; overflow: hidden; touch-action: manipulation; user-select: none; }
  .round { height: 100svh; display: grid; grid-template-rows: auto minmax(0, 1fr); padding: clamp(20px, 4vw, 48px); padding-top: max(64px, 4vw); gap: 20px; }
  .prompt { justify-self: center; margin: 0; max-width: 100%; color: #18312d; font-size: clamp(32px, 4.5vw, 64px); line-height: 1.15; overflow-wrap: anywhere; font-weight: 800; text-align: center; z-index: 1; }

  .choices { display: grid; gap: clamp(12px, 2vw, 26px); min-height: 0; }
  .level-1 .choices { grid-template-columns: 1fr; }
  .level-2 .choices, .level-3 .choices { grid-template-columns: repeat(2, 1fr); }
  .level-4 .choices { grid-template-columns: repeat(3, 1fr); }
  .level-5 .choices { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); }

  .choice { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 0; min-height: 0; border: 5px solid transparent; border-radius: clamp(17px, 3vw, 32px); padding: clamp(15px, 3vw, 42px); background: var(--picture-background, #e4e7ea); transition: background .15s ease, border-color .15s ease, transform .15s ease; }
  .level-1 .choice { background: var(--picture-background, #fff); }
  .choice:active { background: var(--picture-background, #d0d7db); transform: scale(.985); }
  .choice img { display: block; flex: 1; min-height: 0; width: 100%; height: 0; object-fit: contain; pointer-events: none; }
  .picture-name { flex-shrink: 0; max-width: 100%; border-radius: 8px; padding: 3px 10px; background: #fff; color: #18312d; font-size: clamp(18px, 2.5vw, 32px); line-height: 1.2; font-weight: 700; overflow-wrap: anywhere; }
  .blank-choice { background: var(--picture-background, #f7f8f9); }

  .helpful { border-color: #f6c950; background: var(--picture-background, #fff4cc); animation: wiggle .65s ease-in-out 2; box-shadow: 0 0 0 8px #f6c95055; }
  @keyframes wiggle {
    0%, 100% { transform: rotate(0) scale(1); }
    25% { transform: rotate(-2deg) scale(1.02); }
    75% { transform: rotate(2deg) scale(1.02); }
  }

  /* inset-inline-start rather than left, so the button moves to the other
     corner in a right-to-left language and never covers the first picture. */
  .home-button { position: fixed; z-index: 4; top: 12px; inset-inline-start: 12px; border: 2px solid #bfd3cc; border-radius: 999px; padding: 8px 13px; color: #24594f; background: #ffffffd9; font-size: 14px; font-weight: 700; }
  .home-button:hover { background: #fff; }

  @media (max-width: 600px) {
    .round { padding: 58px 12px 12px; gap: 10px; }
    .prompt { font-size: 32px; }
    .level-4 .choices { grid-template-columns: 1fr; grid-template-rows: repeat(3, 1fr); }
    .choice { border-radius: 18px; padding: 12px; }
    .home-button { top: 10px; inset-inline-start: 10px; }
  }
</style>
