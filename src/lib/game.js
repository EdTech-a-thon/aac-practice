import { imagePath, topicNames, topics } from "./topics.js";

export function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function pickTopic(chosen) {
  return chosen === "Random" ? randomItem(topicNames) : chosen;
}

// Level 1 shows a single picture; level 2 pairs it with an empty square; levels
// 3-5 add real distractors. A `null` choice renders as the blank square.
export function createRound(topic, level) {
  const correct = randomItem(topics[topic]);
  const choiceCount = level === 1 ? 1 : level - 1;
  const distractors = shuffle(topics[topic].filter((item) => item !== correct)).slice(0, choiceCount - 1);
  const choices = level === 2 ? [correct, null] : [correct, ...distractors];
  return { topic, correct, choices: shuffle(choices) };
}

// Held in module scope so the browser cannot garbage-collect the requests
// before the pictures are actually needed.
let preloadedQuestionImages = [];
let preloadedCelebrationMedia = [];

export function preloadRound(round) {
  preloadedQuestionImages = round.choices.filter(Boolean).map((choice) => {
    const image = new Image();
    image.src = imagePath(round.topic, choice);
    return image;
  });
}

export const celebrations = ["bubbles", "fireworks", "sparkles", "spin", "stars"];
const celebrationFolder = "/Reinforcement Sounds and Images";

export function celebrationVideo(effect) {
  return `${celebrationFolder}/${effect}.mp4`;
}

export function celebrationAudio(effect) {
  return `${celebrationFolder}/${effect} audio.mp3`;
}

export function preloadCelebrations() {
  preloadedCelebrationMedia = celebrations.flatMap((effect) => {
    const video = document.createElement("video");
    const audio = document.createElement("audio");

    video.preload = "auto";
    video.muted = true;
    video.src = celebrationVideo(effect);
    audio.preload = "auto";
    audio.src = celebrationAudio(effect);
    video.load();
    audio.load();
    return [video, audio];
  });
}
