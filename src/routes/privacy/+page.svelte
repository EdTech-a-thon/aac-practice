<script>
  import InfoPage from "$lib/components/InfoPage.svelte";
</script>

<InfoPage title="Privacy" intro="What we collect, what we don't, and why.">
  <section aria-labelledby="collect-title">
    <h2 id="collect-title">What we collect</h2>
    <p>
      Bridge to AAC does not collect personal information from teachers, therapists, or
      learners. There is no account to make and no form to fill in.
    </p>
    <p>
      We use Cloudflare Web Analytics to anonymously count the number of visits, which
      helps us understand how Bridge to AAC is being used in classrooms. Cloudflare Web
      Analytics is cookieless, does not fingerprint visitors, and does not track users
      across other sites — see Cloudflare's
      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>
      for details. We do not share, sell, or otherwise transfer any visitor data to third
      parties.
    </p>
  </section>

  <section aria-labelledby="device-title">
    <h2 id="device-title">What stays on the device</h2>
    <p>
      The practice level, topic, and timing you pick on the setup screen are held in the
      page itself for as long as the tab is open. They are never sent to us and are not
      saved after the tab is closed, so a fresh visit starts from the beginning.
    </p>
    <p>
      Prompts like “Touch the cat” are spoken by the built-in voice already on the device.
      Nothing the learner touches, hears, or sees is recorded or sent anywhere.
    </p>
  </section>

  <section aria-labelledby="contact-title">
    <h2 id="contact-title">Questions</h2>
    <p>
      Questions or concerns? Email
      <a href="mailto:support@bridgetoaac.com?subject=Bridge%20to%20AAC%20privacy">support@bridgetoaac.com</a>.
    </p>
  </section>
</InfoPage>
