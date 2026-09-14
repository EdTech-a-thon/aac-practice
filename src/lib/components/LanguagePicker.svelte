<script>
  // The language control for the whole site. A native <select> sits invisibly
  // over the icon so phones and screen readers get the picker they already
  // know, while the page shows nothing but the translate glyph.
  import { language, languageOptions, setLanguage, t } from "$lib/i18n/index.svelte.js";
</script>

<label class="language-picker">
  <!-- The conventional translate mark: a Latin letter beside a CJK character,
       which reads as "language" without any word to translate itself. -->
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
  </svg>
  <select
    aria-label={t("language.change")}
    value={language.code}
    onchange={(event) => setLanguage(event.currentTarget.value)}
  >
    {#each languageOptions as option (option.code)}
      <option value={option.code}>{option.name}</option>
    {/each}
  </select>
</label>

<style>
  .language-picker { position: relative; display: inline-grid; place-items: center; flex: 0 0 auto; width: 42px; height: 42px; border: 1px solid #c8d8d2; border-radius: 50%; color: #24594f; background: white; cursor: pointer; }
  .language-picker:hover { border-color: #4d9b8c; background: #eef7f3; }
  .language-picker:focus-within { outline: 2px solid #287769; outline-offset: 2px; }

  /* The real control keeps its keyboard and touch behaviour; it is only the
     browser's own chrome that is hidden behind the globe. */
  select { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
</style>
