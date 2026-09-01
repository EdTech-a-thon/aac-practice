// A short delay lets the new screen paint before the prompt is spoken, which
// keeps the picture and the voice from arriving on top of each other.
const SPEECH_DELAY = 250;

let speakingTimer;

export function speak(text) {
  cancelSpeech();
  speakingTimer = window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.78;
    utterance.pitch = 1.08;
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
