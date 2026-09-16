<script>
  import InfoPage from "$lib/components/InfoPage.svelte";
  import RichText from "$lib/components/RichText.svelte";
  import { t } from "$lib/i18n/index.svelte.js";

  const links = { edtechathon: "https://edtechathon.com" };
</script>

<InfoPage title="about.title" intro="about.intro">
  <section aria-labelledby="edtechathon-title">
    <div class="section-heading">
      <img src="/edtechathon-logo.svg" alt="" width="40" height="40" />
      <h2 id="edtechathon-title">{t("about.community.title")}</h2>
    </div>
    <p><RichText key="about.community.body" {links} /></p>

    <figure>
      <img src="/edtechathon-2026.webp" alt={t("about.community.photo")} width="1400" height="630" />
      <figcaption>{t("about.community.caption")}</figcaption>
    </figure>
  </section>

  <section aria-labelledby="promise-title">
    <h2 id="promise-title">{t("about.promise.title")}</h2>
    <ul>
      <li><strong>{t("about.promise.paywalls")}</strong></li>
      <li><strong>{t("about.promise.ads")}</strong></li>
      <li><strong>{t("about.promise.tracking")}</strong></li>
    </ul>
  </section>

  <section aria-labelledby="feedback-title">
    <h2 id="feedback-title">{t("about.feedback.title")}</h2>
    <p>{t("about.feedback.body")}</p>
    <a class="email-button" href="mailto:support@bridgetoaac.com?subject=Picture%20Practice%20feedback">
      {t("about.feedback.button")}
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

  ul { margin: 0; padding-inline-start: 22px; display: grid; gap: 8px; color: #52655f; font-size: 15px; line-height: 1.65; }
  strong { color: #18312d; }

  .email-button { display: inline-block; border-radius: 999px; padding: 12px 20px; color: white; background: #287769; box-shadow: 0 4px 0 #194f46; font-size: 15px; font-weight: 700; text-decoration: none; }
  .email-button:active { transform: translateY(2px); box-shadow: 0 2px 0 #194f46; }
</style>
