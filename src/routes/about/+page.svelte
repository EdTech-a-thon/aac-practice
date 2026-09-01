<script>
  import InfoPage from "$lib/components/InfoPage.svelte";
</script>

<InfoPage
  title="About"
  intro="A simple, joyful way for nonverbal learners to practice the choices an AAC app asks them to make."
>
  <section aria-labelledby="edtechathon-title">
    <div class="section-heading">
      <img src="/edtechathon-logo.svg" alt="" width="40" height="40" />
      <h2 id="edtechathon-title">From the EdTech-a-thon</h2>
    </div>
    <p>
      Bridge to AAC is a project from the
      <a href="https://edtechathon.com" target="_blank" rel="noopener noreferrer">EdTech-a-thon</a>,
      a community of builders making free tools for classrooms. Learn more about who we
      are and what else we're building at
      <a href="https://edtechathon.com" target="_blank" rel="noopener noreferrer">edtechathon.com</a>.
    </p>

    <figure>
      <img src="/edtechathon-2026.webp" alt="Participants of the 2026 EdTech-a-thon" width="1400" height="630" />
      <figcaption>EdTech-a-thon 2026</figcaption>
    </figure>
  </section>

  <section aria-labelledby="promise-title">
    <h2 id="promise-title">Our promise</h2>
    <ul>
      <li><strong>Zero paywalls.</strong></li>
      <li><strong>Zero ads.</strong></li>
      <li><strong>Zero tracking of personal data.</strong></li>
    </ul>
  </section>

  <section aria-labelledby="feedback-title">
    <h2 id="feedback-title">Feedback &amp; ideas</h2>
    <p>
      We'd love to hear from you. Tell us what's working, what's not, or pitch us an idea
      for a tool you wish existed. We're here to help.
    </p>
    <a class="email-button" href="mailto:support@bridgetoaac.com?subject=Bridge%20to%20AAC%20feedback">
      Email support@bridgetoaac.com
    </a>
  </section>
</InfoPage>

<style>
  .section-heading { margin-bottom: 14px; display: flex; gap: 12px; align-items: center; }
  .section-heading img { width: 40px; height: 40px; flex: 0 0 auto; }
  .section-heading h2 { margin: 0; font-size: 21px; letter-spacing: -.02em; }

  figure { width: min(100%, 560px); margin: 26px auto 0; padding: 12px 12px 22px; border: 1px solid #e2e8e5; border-radius: 4px; background: white; box-shadow: 0 18px 44px #315d4f24; transform: rotate(-1deg); }
  figure img { width: 100%; height: auto; display: block; background: #eef3f1; }
  figcaption { padding-top: 16px; color: #52655f; font-family: "Segoe Script", "Bradley Hand", "Snell Roundhand", "Comic Sans MS", cursive; font-size: 19px; text-align: center; }

  ul { margin: 0; padding-left: 22px; display: grid; gap: 8px; color: #52655f; font-size: 15px; line-height: 1.65; }
  strong { color: #18312d; }

  .email-button { display: inline-block; border-radius: 999px; padding: 12px 20px; color: white; background: #287769; box-shadow: 0 4px 0 #194f46; font-size: 15px; font-weight: 700; text-decoration: none; }
  .email-button:active { transform: translateY(2px); box-shadow: 0 2px 0 #194f46; }
</style>
