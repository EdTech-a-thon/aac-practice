// A short delay lets the new screen paint before the prompt is spoken, which
// keeps the picture and the voice from arriving on top of each other.
const SPEECH_DELAY = 250;

let speakingTimer;

// Browsers disagree about how a language is chosen: some honour utterance.lang
// on their own, others only ever speak in the language of the voice they were
// handed. Setting both is what makes the prompt come out in the right language.
export function voiceFor(language) {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const wanted = language.toLowerCase().replace("_", "-");
  return (
    voices.find((voice) => voice.lang.toLowerCase().replace("_", "-") === wanted) ??
    voices.find((voice) => baseLanguage(voice.lang) === baseLanguage(language))
  );
}

export function baseLanguage(language) {
  return language.split(/[-_]/)[0].toLowerCase();
}

export function speak(text, language) {
  cancelSpeech();
  speakingTimer = window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.78;
    utterance.pitch = 1.08;
    utterance.lang = language;
    const voice = voiceFor(language);
    if (voice) utterance.voice = voice;
    window.speechSynthesis?.speak(utterance);
  }, SPEECH_DELAY);
}

export function cancelSpeech() {
  window.clearTimeout(speakingTimer);
  window.speechSynthesis?.cancel();
}

export function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}

export function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {});
  }
}
