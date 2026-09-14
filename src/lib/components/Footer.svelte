<!-- The EdTech-a-thon footer, shared with the group's other classroom tools. -->
<script>
  import { t } from "$lib/i18n/index.svelte.js";
</script>

<footer>
  <a class="built-by" href="https://edtechathon.com" target="_blank" rel="noopener noreferrer">
    <img src="/edtechathon-logo.svg" alt="" width="24" height="24" />
    {t("footer.builtBy")}
  </a>
  <a href="/about">{t("footer.about")}</a>
  <a href="/privacy">{t("footer.privacy")}</a>
</footer>

<style>
  footer { width: min(1180px, calc(100% - 40px)); margin: auto; padding: 26px 0 30px; display: flex; flex-wrap: wrap; gap: 8px 20px; justify-content: center; align-items: center; text-align: center; }
  a { color: #5d716c; font-size: 14px; text-decoration: none; }
  a:hover { color: #287769; text-decoration: underline; text-underline-offset: 4px; }
  .built-by { display: flex; gap: 8px; align-items: center; }
  .built-by img { width: 24px; height: 24px; }
</style>
