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
    // Private browsing can refuse local storage. Fall through to the browser's
    // own language, which is a better guess than English.
  }
  return browserCode() ?? "en";
}

// A teacher whose device is already in Spanish should land on a Spanish page
// without hunting for the picker. Only the part before the region matters —
// es-MX and es-ES are both our "es" — and the picker still wins once used,
// because a saved choice is read first.
function browserCode() {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = String(tag ?? "").toLowerCase().split("-")[0];
    if (languages[code]) return code;
  }
  return null;
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

// Prose on the welcome, about and privacy pages has links inside a sentence.
// They are written into the translation the way a Markdown link is —
// `[visible words](name)` — so a translator can move the link to wherever the
// sentence wants it, which matters most in Arabic. `name` is looked up in the
// map of destinations the page passes to RichText.svelte.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function segments(key, values = {}) {
  const text = t(key, values);
  const parts = [];
  let consumed = 0;
  for (const match of text.matchAll(LINK)) {
    if (match.index > consumed) parts.push({ text: text.slice(consumed, match.index) });
    parts.push({ text: match[1], link: match[2] });
    consumed = match.index + match[0].length;
  }
  if (consumed < text.length) parts.push({ text: text.slice(consumed) });
  return parts;
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
