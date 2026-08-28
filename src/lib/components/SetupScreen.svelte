<script>
  import { onMount } from "svelte";
  import { createRound, pickTopic, preloadRound } from "$lib/game.js";
  import { levels, settings } from "$lib/settings.svelte.js";
  import { topicNames } from "$lib/topics.js";
  import { enterFullscreen, exitFullscreen } from "$lib/screen.js";
  import LevelPreview from "./LevelPreview.svelte";

  let { onstart, onback } = $props();

  // Built ahead of the tap so the first round never waits on a download.
  let prepared = $state();

  $effect(() => {
    const nextRound = createRound(pickTopic(settings.topic), settings.level);
    preloadRound(nextRound);
    prepared = nextRound;
  });

  onMount(exitFullscreen);

  function start() {
    // Fullscreen has to be requested from the tap itself to count as a gesture.
    enterFullscreen();
    onstart(prepared ?? createRound(pickTopic(settings.topic), settings.level));
  }
</script>

<main class="setup-page">
  <section class="setup-card" aria-labelledby="page-title">
    <button class="back-button" onclick={onback} aria-label="Back to welcome page">← Back</button>
    <div class="brand-mark" aria-hidden="true">✦</div>
    <p class="eyebrow">AAC touch practice</p>
    <h1 id="page-title">Touch &amp; Choose</h1>
    <p class="intro">A simple, joyful way to practice making choices on a screen.</p>

    <fieldset>
      <legend>Choose a picture topic</legend>
      <label class="select-wrap">
        <select aria-label="Picture topic" bind:value={settings.topic}>
          <option value="Random">Random</option>
          {#each topicNames as topic (topic)}
            <option value={topic}>{topic}</option>
          {/each}
        </select>
      </label>
    </fieldset>

    <fieldset>
      <legend>Choose a level</legend>
      <div class="level-list">
        {#each levels as level (level.value)}
          <label class="level-option" class:selected={settings.level === level.value}>
            <input type="radio" name="level" value={level.value} bind:group={settings.level} />
            <span class="level-number">{level.value}</span>
            <span class="level-copy">
              <strong>{level.title}</strong>
              <small>{level.detail}</small>
            </span>
            <div class="option-preview" aria-hidden="true">
              <LevelPreview level={level.value} topic={settings.topic} />
            </div>
          </label>
        {/each}
      </div>
    </fieldset>

    <fieldset>
      <legend>Choose timing</legend>
      <div class="timing-options">
        <div class="timing-option" class:disabled={!settings.rewardEnabled}>
          <label class="timing-heading">
            <input type="checkbox" bind:checked={settings.rewardEnabled} />
            <span>Show visual reward for</span>
          </label>
          <span class="number-field">
            <input aria-label="Visual reward seconds" type="number" min="1" max="30" step="1" bind:value={settings.rewardSeconds} disabled={!settings.rewardEnabled} />
            <span>seconds</span>
          </span>
        </div>
        <div class="timing-option" class:disabled={!settings.hintEnabled}>
          <label class="timing-heading">
            <input type="checkbox" bind:checked={settings.hintEnabled} />
            <span>Provide hint after</span>
          </label>
          <span class="number-field">
            <input aria-label="Yellow hint delay seconds" type="number" min="1" max="30" step="1" bind:value={settings.hintSeconds} disabled={!settings.hintEnabled} />
            <span>seconds</span>
          </span>
        </div>
      </div>
    </fieldset>

    <button class="start-button" onclick={start}>Start practice <span aria-hidden="true">→</span></button>
    <p class="setup-note">The activity continues until you choose Home.</p>
  </section>
</main>

<style>
  .setup-page { min-height: 100svh; display: grid; place-items: center; padding: 28px 18px; background: radial-gradient(circle at 4% 0%, #dcefe8 0, transparent 30rem), radial-gradient(circle at 100% 100%, #fff0c9 0, transparent 28rem), #f8fbf9; }
  .setup-card { width: min(100%, 760px); background: #fff; border: 1px solid #d5e1dc; border-radius: 26px; padding: clamp(26px, 5vw, 46px); box-shadow: 0 20px 60px #315d4f1c; }
  .back-button { margin: 0 0 20px; border: 0; padding: 0; color: #287769; background: transparent; font-weight: 700; }
  .brand-mark { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 16px; background: #f6c950; color: #172033; font-size: 25px; }
  .eyebrow { margin: 22px 0 5px; text-transform: uppercase; letter-spacing: .13em; font-size: 12px; font-weight: 700; color: #91c9d6; }
  h1 { margin: 0; color: #18312d; font-size: clamp(35px, 7vw, 52px); line-height: 1.05; letter-spacing: -.045em; }
  .intro { margin: 14px 0 31px; color: #60736e; font-size: 17px; line-height: 1.45; }

  fieldset { border: 0; padding: 0; margin: 0 0 28px; }
  legend { padding: 0; margin: 0 0 12px; font-weight: 700; color: #18312d; }

  .level-list { display: grid; gap: 8px; }
  .level-option { display: grid; grid-template-columns: auto minmax(150px, 1fr) 116px; align-items: center; gap: 14px; border: 2px solid #d5e1dc; border-radius: 14px; padding: 10px 13px; color: #60736e; cursor: pointer; transition: .15s ease; }
  .level-option:hover, .level-option.selected { border-color: #4d9b8c; background: #eef7f3; }
  .level-option input { position: absolute; opacity: 0; }
  .level-number { display: grid; place-items: center; flex: 0 0 auto; width: 33px; height: 33px; border-radius: 50%; background: #e5eeea; color: #315d54; font-weight: 700; }
  .selected .level-number { background: #287769; color: #fff; }
  .level-option strong, .level-option small { display: block; }
  .level-option strong { color: #18312d; font-size: 15px; }
  .level-option small { margin-top: 2px; font-size: 13px; }
  .option-preview { display: block; width: 116px; height: 64px; padding: 5px; border-radius: 10px; background: #e9f0ed; }

  .select-wrap { display: block; position: relative; }
  .select-wrap select { width: 100%; appearance: none; border: 2px solid #d5e1dc; border-radius: 13px; padding: 14px 42px 14px 15px; background: #fff; color: #18312d; font-weight: 600; }
  .select-wrap::after { content: "⌄"; position: absolute; right: 16px; top: 8px; color: #287769; font-size: 23px; pointer-events: none; }

  .timing-options { display: grid; gap: 14px; }
  .timing-option { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; color: #18312d; font-weight: 700; }
  .timing-option.disabled { color: #788a85; }
  .timing-heading { display: flex; align-items: center; gap: 9px; }
  .timing-heading input { width: 19px; height: 19px; accent-color: #287769; }
  .number-field { display: flex; align-items: center; gap: 9px; color: #60736e; font-size: 14px; font-weight: 600; }
  .number-field input { width: 72px; border: 1px solid #b8cbc4; border-radius: 9px; padding: 8px 10px; color: #18312d; background: #fff; font: inherit; font-size: 16px; }
  .number-field input:disabled { color: #91a09c; background: #e7ecea; cursor: not-allowed; }

  .start-button { width: 100%; border: 0; border-radius: 14px; padding: 17px; background: #f6c950; color: #172033; font-weight: 700; font-size: 18px; box-shadow: 0 5px 0 #b88d25; }
  .start-button:active { transform: translateY(3px); box-shadow: 0 2px 0 #b88d25; }
  .start-button span { margin-left: 8px; font-size: 24px; vertical-align: -1px; }
  .setup-note { margin: 20px 0 0; text-align: center; color: #788a85; font-size: 13px; }

  @media (max-width: 560px) {
    .level-option { grid-template-columns: auto 1fr; }
    .option-preview { grid-column: 2; width: 100%; height: 92px; }
  }
</style>
