<script>
  import InfoPage from "$lib/components/InfoPage.svelte";
  import RichText from "$lib/components/RichText.svelte";
  import { promptFor, t } from "$lib/i18n/index.svelte.js";

  const links = {
    cloudflare: "https://www.cloudflare.com/privacypolicy/",
    email: "mailto:support@bridgetoaac.com?subject=Bridge%20to%20AAC%20privacy",
  };
</script>

<InfoPage title="privacy.title" intro="privacy.intro">
  <section aria-labelledby="collect-title">
    <h2 id="collect-title">{t("privacy.collect.title")}</h2>
    <p>{t("privacy.collect.body")}</p>
    <p><RichText key="privacy.collect.analytics" {links} /></p>
  </section>

  <section aria-labelledby="device-title">
    <h2 id="device-title">{t("privacy.device.title")}</h2>
    <p>{t("privacy.device.settings")}</p>
    <p>{t("privacy.device.language")}</p>
    <!-- The example prompt is shown in the language the visitor is reading. -->
    <p>{t("privacy.device.speech", { prompt: promptFor("cat").replace(/[.!?]$/, "") })}</p>
  </section>

  <section aria-labelledby="contact-title">
    <h2 id="contact-title">{t("privacy.contact.title")}</h2>
    <p><RichText key="privacy.contact.body" {links} /></p>
  </section>
</InfoPage>
