// Everything the app needs to speak another language. To add a fifth language,
// copy en.js, translate the right-hand side, and add it to `languages` below —
// no component needs to change.
import ar from "./ar.js";
import en from "./en.js";
import es from "./es.js";
import ru from "./ru.js";

const languages = { en, es, ru, ar };
const STORAGE_KEY = "bridge-to-aac-language";

export const languageOptions = Object.entries(languages).map(([code, language]) => ({
  code,
  name: language.name,
}));

// The teacher's choice outlives the session, so a classroom tablet stays in the
// language it was set to.
export const language = $state({ code: savedCode() });

function savedCode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && languages[saved]) return saved;
  } catch {
    // Private browsing can refuse local storage. English is a fine fallback.
  }
  return "en";
}

export function setLanguage(code) {
  if (!languages[code]) return;
  language.code = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // The choice still applies for this session, it just will not be remembered.
  }
}

// Reading `language.code` here is what makes every `t(...)` in a component
// re-run when the teacher picks a different language.
export function current() {
  return languages[language.code] ?? en;
}

// English fills any gap, so a half-finished translation still shows something
// readable rather than a raw key.
export function t(key, values = {}) {
  const text = current().ui[key] ?? en.ui[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
}

export function topicLabel(topic) {
  return current().topics[topic] ?? en.topics[topic] ?? topic;
}

function forms(language, word) {
  const entry = language.words[word];
  return Array.isArray(entry) ? entry : [entry, entry];
}

export function wordLabel(word) {
  return forms(current(), word)[0] ?? forms(en, word)[0] ?? word;
}

export function promptFor(word) {
  const spoken = forms(current(), word)[1] ?? forms(en, word)[1] ?? word;
  return current().prompt.replace("{word}", spoken);
}
