<script>
  let { onstay, onhome } = $props();

  let typed = $state("");
  let input;

  // Typing the word is the lock: it keeps a learner exploring the screen from
  // tapping their way out of the activity.
  let unlocked = $derived(typed.trim().toLowerCase() === "home");

  $effect(() => {
    input?.focus();
  });
</script>

<div class="home-dialog" role="dialog" aria-modal="true" aria-labelledby="home-title">
  <section>
    <h2 id="home-title">Leave practice?</h2>
    <p>This will return to the teacher setup screen. Type <strong>home</strong> to continue.</p>
    <label class="home-confirm-label" for="home-confirm-input">Type home</label>
    <input
      class="home-confirm-input"
      id="home-confirm-input"
      type="text"
      autocomplete="off"
      autocapitalize="none"
      spellcheck="false"
      bind:this={input}
      bind:value={typed}
      onkeydown={(event) => {
        if (event.key === "Enter" && unlocked) onhome();
      }}
    />
    <div>
      <button class="dialog-stay" onclick={onstay}>Keep playing</button>
      <button class="dialog-home" disabled={!unlocked} onclick={onhome}>Go Home</button>
    </div>
  </section>
</div>

<style>
  .home-dialog { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 24px; background: #101722d9; }
  .home-dialog section { width: min(100%, 400px); padding: 28px; border-radius: 22px; background: #fff; color: #172033; text-align: center; }
  .home-dialog h2 { margin: 0; font-size: 26px; }
  .home-dialog p { margin: 10px 0 16px; color: #58697d; line-height: 1.4; }
  .home-confirm-label { display: block; margin-bottom: 6px; color: #26354a; font-size: 14px; font-weight: 700; text-align: left; }
  .home-confirm-input { width: 100%; margin-bottom: 20px; border: 2px solid #cbd6e2; border-radius: 10px; padding: 11px 12px; color: #172033; font: inherit; }
  .home-confirm-input:focus { border-color: #315c76; outline: 3px solid #315c7640; }
  .home-dialog section div { display: flex; gap: 10px; justify-content: center; }
  .home-dialog button { border: 0; border-radius: 10px; padding: 12px 15px; font-weight: 700; }
  .dialog-stay { color: #26354a; background: #e9eef3; }
  .dialog-home { color: #fff; background: #315c76; }
  .dialog-home:disabled { cursor: not-allowed; opacity: .45; }
</style>
