<script>
  let { onstay, onhome } = $props();
</script>

<div class="home-dialog" role="dialog" aria-modal="true" aria-labelledby="home-title">
  <section>
    <h2 id="home-title">Leave practice?</h2>
    <p>This will return to the teacher setup screen.</p>
    <div>
      <button class="dialog-stay" onclick={onstay}>Keep Playing</button>
      <button class="dialog-home" onclick={onhome}>Go Home</button>
    </div>
  </section>
</div>

<style>
  .home-dialog { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 24px; background: #101722d9; }
  .home-dialog section { width: min(100%, 400px); padding: 28px; border-radius: 22px; background: #fff; color: #172033; text-align: center; }
  .home-dialog h2 { margin: 0; font-size: 26px; }
  .home-dialog p { margin: 10px 0 20px; color: #58697d; line-height: 1.4; }
  .home-dialog section div { display: flex; gap: 10px; justify-content: center; }
  .home-dialog button { border: 0; border-radius: 10px; padding: 12px 15px; font-weight: 700; }
  .dialog-stay { color: #26354a; background: #e9eef3; }
  .dialog-home { color: #fff; background: #315c76; }
</style>
