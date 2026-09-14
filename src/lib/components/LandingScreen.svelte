<script>
  import LanguagePicker from "./LanguagePicker.svelte";
  import LevelPreview from "./LevelPreview.svelte";
  import Footer from "./Footer.svelte";
  import { levels } from "$lib/settings.svelte.js";
  import { topicNames } from "$lib/topics.js";
  import { current, promptFor, t, topicLabel, wordLabel } from "$lib/i18n/index.svelte.js";

  let { oncontinue } = $props();
  let previewTopic = $state("Animals");

  // The arrow on a call to action points the way the language reads.
  let arrow = $derived(current().dir === "rtl" ? "←" : "→");
</script>

<main class="landing-page">
  <nav aria-label={t("nav.label")}>
    <a class="brand" href="#top"><img src="/favicon.svg" alt="" width="34" height="34" /> Bridge to AAC</a>
    <div class="nav-actions">
      <button onclick={oncontinue}>{t("nav.setup")}</button>
      <LanguagePicker />
    </div>
  </nav>

  <section class="hero" id="top" aria-labelledby="landing-title">
    <div class="hero-copy">
      <p class="eyebrow">{t("landing.eyebrow")}</p>
      <h1 id="landing-title"><span>{t("landing.title")}</span><em>{t("landing.titleEmphasis")}</em></h1>
      <p class="hero-intro">{t("landing.intro")}</p>
      <button class="primary-button" onclick={oncontinue}>{t("landing.cta")} <span aria-hidden="true">{arrow}</span></button>
    </div>

    <div class="hero-demo" aria-label={t("landing.demoLabel")}>
      <div class="demo-prompt">{promptFor("cat")}</div>
      <div class="demo-choices">
        <div class="demo-card target">
          <img src="/Animals/cat.webp" alt={wordLabel("cat")} />
          <small>{wordLabel("cat")}</small>
          <div class="tap-badge" aria-hidden="true">{t("landing.tap")}</div>
        </div>
        <div class="demo-card">
          <img src="/Animals/dog.webp" alt={wordLabel("dog")} />
          <small>{wordLabel("dog")}</small>
        </div>
      </div>
    </div>
  </section>

  <section class="how-it-works" aria-labelledby="how-title">
    <p class="eyebrow">{t("landing.howEyebrow")}</p>
    <h2 id="how-title">{t("landing.howTitle")}</h2>
    <p class="section-intro">{t("landing.howIntro")}</p>

    <label class="topic-preview-select">
      <span>{t("landing.previewTopic")}</span>
      <select bind:value={previewTopic}>
        {#each topicNames as topic (topic)}
          <option value={topic}>{topicLabel(topic)}</option>
        {/each}
      </select>
    </label>

    <div class="level-roadmap">
      {#each levels as level (level.value)}
        <article class="level-card">
          <div class="level-heading">
            <span>{t("landing.level", { number: level.value })}</span>
            <strong>{level.value === 1 ? t("level.1.errorless") : t(level.title)}</strong>
          </div>
          <div class="mini-screen level-{level.value}" aria-hidden="true">
            <LevelPreview level={level.value} topic={previewTopic} />
          </div>
          <p>{t(level.detail)}</p>
        </article>
      {/each}
    </div>

    <div class="steps">
      <div><span>1</span><p><strong>{t("landing.step1.title")}</strong>{t("landing.step1.body")}</p></div>
      <div><span>2</span><p><strong>{t("landing.step2.title")}</strong>{t("landing.step2.body")}</p></div>
      <div><span>3</span><p><strong>{t("landing.step3.title")}</strong>{t("landing.step3.body")}</p></div>
    </div>
  </section>

  <Footer />
</main>

<style>
  .landing-page { min-height: 100svh; color: #18312d; background: #fffdf8; }
  nav { width: min(1180px, calc(100% - 40px)); margin: auto; padding: 22px 0; display: flex; justify-content: space-between; align-items: center; }
  .brand { display: flex; gap: 10px; align-items: center; color: #18312d; font-weight: 800; text-decoration: none; }
  .brand img { width: 34px; height: 34px; border-radius: 11px; }
  .nav-actions { display: flex; gap: 10px; align-items: center; }
  nav button { border: 1px solid #c8d8d2; border-radius: 999px; padding: 10px 16px; color: #24594f; background: white; font-weight: 700; }

  .hero { width: min(1180px, calc(100% - 40px)); min-height: 590px; margin: auto; display: grid; grid-template-columns: 1.05fr .95fr; gap: clamp(40px, 8vw, 100px); align-items: center; padding: 55px 0 90px; }
  .eyebrow { margin: 0 0 13px; color: #287769; font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  h1, h2 { margin: 0; letter-spacing: -.045em; line-height: 1.04; }
  h1 { max-width: 720px; font-size: clamp(42px, 5vw, 70px); }
  /* Each half of the headline gets its own line. It is left free to wrap
     because a translation can be a good deal longer than the English. */
  h1 span, h1 em { display: block; text-wrap: balance; }
  h1 em { color: #287769; font-family: Georgia, serif; font-weight: 400; }
  .hero-intro { max-width: 600px; margin: 24px 0 30px; color: #5d716c; font-size: clamp(17px, 2vw, 20px); line-height: 1.55; }
  .primary-button { border: 0; border-radius: 999px; padding: 16px 22px; color: white; background: #287769; box-shadow: 0 5px 0 #194f46; font-size: 16px; font-weight: 800; }
  .primary-button:active { transform: translateY(3px); box-shadow: 0 2px 0 #194f46; }
  .primary-button span { padding-inline-start: 8px; font-size: 20px; }

  .hero-demo { position: relative; padding: 30px; border: 1px solid #d8e3de; border-radius: 34px; background: #eef7f2; box-shadow: 0 24px 60px #315d4f1c; transform: rotate(1.5deg); }
  .demo-prompt { margin-bottom: 22px; color: #18312d; font-size: clamp(20px, 2.5vw, 28px); font-weight: 800; text-align: center; }
  .demo-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .demo-card { position: relative; display: grid; grid-template-rows: 1fr auto; min-width: 0; aspect-ratio: 1; padding: 8px 8px 10px; border: 3px solid transparent; border-radius: 24px; background: white; box-shadow: 0 6px 18px #315d4f18; }
  .demo-card img { width: 100%; height: 100%; min-height: 0; border-radius: 16px; object-fit: cover; }
  .demo-card small { margin-top: 8px; color: #526862; font-size: 15px; font-weight: 700; text-align: center; }
  .demo-card.target { border-color: #f0bf45; background: #fff9e8; }
  .tap-badge { position: absolute; inset-inline-end: -18px; bottom: -18px; z-index: 1; display: grid; place-items: center; width: 72px; height: 72px; border-radius: 50%; color: #18312d; background: #f5c95f; font-family: Georgia, serif; font-size: 19px; font-style: italic; font-weight: 700; transform: rotate(-9deg); box-shadow: 0 8px 20px #18312d2a; }

  .how-it-works { padding: 90px max(20px, calc((100% - 1180px) / 2)); background: #f1f7f4; text-align: center; }
  h2 { font-size: clamp(35px, 4.5vw, 54px); }
  .section-intro { max-width: 610px; margin: 16px auto 42px; color: #60736e; font-size: 18px; line-height: 1.5; }
  .topic-preview-select { width: min(100%, 320px); margin: -20px auto 28px; display: grid; gap: 7px; color: #18312d; font-size: 13px; font-weight: 800; text-align: start; }
  .topic-preview-select select { width: 100%; border: 2px solid #cbdcd5; border-radius: 12px; padding: 11px 13px; color: #18312d; background: white; font: inherit; }
  .level-roadmap { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: start; }
  .level-card { min-width: 0; padding: 18px; border: 1px solid #d6e3dd; border-radius: 20px; background: white; }
  .level-heading span, .level-heading strong { display: block; }
  .level-heading span { margin-bottom: 5px; color: #287769; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  .level-heading strong { min-height: 38px; font-size: 16px; }
  .mini-screen { height: 112px; margin: 14px 0; display: grid; gap: 7px; padding: 9px; border-radius: 13px; background: #edf3f0; }
  .level-card > p { margin: 0; color: #687b76; font-size: 13px; line-height: 1.4; }
  .steps { margin-top: 44px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; text-align: start; }
  .steps > div { display: flex; gap: 14px; align-items: flex-start; padding: 8px; }
  .steps span { display: grid; place-items: center; flex: 0 0 34px; height: 34px; border-radius: 50%; color: #18312d; background: #f5c95f; font-weight: 800; }
  .steps p { margin: 0; color: #637670; font-size: 14px; line-height: 1.4; }
  .steps strong { display: block; margin-bottom: 4px; color: #18312d; font-size: 16px; }

  @media (max-width: 850px) {
    .hero { grid-template-columns: 1fr; padding-top: 35px; }
    .hero-demo { max-width: 560px; }
    .level-roadmap { grid-template-columns: repeat(2, 1fr); }
    .level-card:last-child { grid-column: 1 / -1; }
    .steps { grid-template-columns: 1fr; }
  }
  @media (max-width: 520px) {
    nav button { display: none; }
    .hero { min-height: auto; padding-bottom: 65px; }
    .hero-demo { padding: 20px; border-radius: 25px; }
    .tap-badge { right: -8px; width: 60px; height: 60px; }
    .level-roadmap { grid-template-columns: 1fr; }
    .level-card:last-child { grid-column: auto; }
  }
</style>
