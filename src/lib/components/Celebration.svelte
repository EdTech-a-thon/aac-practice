<script>
  import { celebrationAudio, celebrationVideo } from "$lib/game.js";

  let { effect } = $props();
</script>

<section class="reinforcement">
  <!-- svelte-ignore a11y_media_has_caption -->
  <video autoplay muted playsinline loop aria-label="Celebration animation">
    <source src={celebrationVideo(effect)} type="video/mp4" />
  </video>
  <p>Wonderful!</p>
  <audio autoplay>
    <source src={celebrationAudio(effect)} type="audio/mpeg" />
  </audio>
</section>

<style>
  .reinforcement { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 24px; background: #07111cf2; overflow: hidden; }
  .reinforcement video { position: absolute; width: 100%; height: 100%; object-fit: cover; }
  .reinforcement p { position: relative; margin: 0; color: #fff; font-size: clamp(48px, 11vw, 130px); font-weight: 800; letter-spacing: -.06em; text-shadow: 0 4px 18px #000b; animation: celebrate .7s ease-out both; }
  @keyframes celebrate {
    from { transform: scale(.4) rotate(-8deg); opacity: 0; }
    to { transform: scale(1) rotate(0); opacity: 1; }
  }
</style>
