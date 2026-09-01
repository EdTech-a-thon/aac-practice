<script>
  // The shell the About and Privacy pages share: the site nav, a column of
  // prose cards, and the EdTech-a-thon footer.
  import Footer from "./Footer.svelte";

  let { title, intro, children } = $props();
</script>

<svelte:head><title>{title} · Bridge to AAC</title></svelte:head>

<div class="info-page">
  <nav aria-label="Main navigation">
    <a class="brand" href="/"><img src="/favicon.svg" alt="" width="34" height="34" /> Bridge to AAC</a>
    <a class="back" href="/">← Back to practice</a>
  </nav>

  <main>
    <h1>{title}</h1>
    <p class="lede">{intro}</p>
    {@render children()}
  </main>

  <Footer />
</div>

<style>
  .info-page { min-height: 100svh; display: flex; flex-direction: column; color: #18312d; background: #fffdf8; }
  nav { width: min(860px, calc(100% - 40px)); margin: auto; padding: 22px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  .brand { display: flex; gap: 10px; align-items: center; color: #18312d; font-weight: 800; text-decoration: none; }
  .brand img { width: 34px; height: 34px; border-radius: 11px; }
  .back { border: 1px solid #c8d8d2; border-radius: 999px; padding: 9px 15px; color: #24594f; background: white; font-size: 14px; font-weight: 700; text-decoration: none; }
  .back:hover { border-color: #4d9b8c; background: #eef7f3; }

  main { width: min(860px, calc(100% - 40px)); margin: 0 auto; padding: 18px 0 40px; flex: 1; }
  h1 { margin: 0; font-size: clamp(35px, 6vw, 52px); line-height: 1.05; letter-spacing: -.045em; }
  .lede { margin: 14px 0 30px; color: #60736e; font-size: 17px; line-height: 1.45; }

  /* Shared card and prose styling for the sections each page passes in. */
  .info-page :global(section) { margin-bottom: 20px; padding: clamp(20px, 4vw, 30px); border: 1px solid #d6e3dd; border-radius: 22px; background: white; }
  .info-page :global(section > h2) { margin: 0 0 12px; font-size: 21px; letter-spacing: -.02em; }
  .info-page :global(section p) { margin: 0 0 14px; color: #52655f; font-size: 15px; line-height: 1.65; }
  .info-page :global(section p:last-child) { margin-bottom: 0; }
  .info-page :global(section p a), .info-page :global(section li a) { color: #287769; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
</style>
