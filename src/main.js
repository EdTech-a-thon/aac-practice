import "./style.css";

const topics = {
  Animals: ["bear", "bird", "butterfly", "cat", "dog", "elephant", "fish", "frog", "monkey", "pig", "sheep", "turtle"],
  Colors: ["blue", "brown", "green", "gray", "orange", "pink", "purple", "red", "yellow"],
  Food: ["apple", "banana", "blueberries", "bread", "broccoli", "carrot", "cookie", "egg", "rice", "water"],
  Body: ["arm", "brain", "ear", "eyes", "feet", "hair", "hand", "teeth", "tongue"],
  Clothing: ["pants", "shirt", "shoes", "socks", "sunglasses"],
  Home: ["bed", "door", "sink", "table", "toilet", "window"],
  People: ["astronaut", "builder", "cook", "dancer", "doctor", "farmer", "firefighter", "painter", "pilot", "scientist"],
  School: ["backpack", "bus", "crayons", "desk", "eraser", "glue", "paper", "pencil", "scissors", "tape"],
  Toys: ["baby", "ball", "bike", "bubbles", "dinosaur", "food", "lego", "playdoh", "shovel", "train", "truck"],
};

const svgImages = new Set(["People/astronaut", "People/scientist"]);

const reinforce = ["bubbles", "fireworks", "sparkles", "spin", "stars"];
const app = document.querySelector("#app");
let settings = { level: 1, topic: "Random" };
let gameTopic;
let hintTimer;
let reinforcementTimer;
let speakingTimer;
let nextRound;
let preparedFirstRound;
let preloadedQuestionImages = [];
let preloadedCelebrationMedia = [];

function titleCase(word) {
  return word.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function imagePath(topic, word) {
  const key = `${topic}/${word}`;
  const extension = svgImages.has(key) ? "svg" : "webp";
  return `/${topic}/${word}.${extension}`;
}

function preloadNextRound(round) {
  preloadedQuestionImages = round.choices
    .filter(Boolean)
    .map((choice) => {
      const image = new Image();
      image.src = imagePath(round.topic, choice);
      return image;
    });
}

function prepareNextRound() {
  nextRound = createRound(gameTopic);
  preloadNextRound(nextRound);
}

function prepareFirstRound() {
  const topic = settings.topic === "Random" ? randomItem(Object.keys(topics)) : settings.topic;
  preparedFirstRound = createRound(topic);
  preloadNextRound(preparedFirstRound);
}

function preloadCelebrations() {
  const folder = "/Reinforcement Sounds and Images";

  preloadedCelebrationMedia = reinforce.flatMap((effect) => {
    const video = document.createElement("video");
    const audio = document.createElement("audio");

    video.preload = "auto";
    video.muted = true;
    video.src = `${folder}/${effect}.mp4`;
    audio.preload = "auto";
    audio.src = `${folder}/${effect} audio.mp3`;
    video.load();
    audio.load();
    return [video, audio];
  });
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function clearTimers() {
  window.clearTimeout(hintTimer);
  window.clearTimeout(reinforcementTimer);
  window.clearTimeout(speakingTimer);
  window.speechSynthesis?.cancel();
}

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {});
  }
}

function speak(text) {
  window.speechSynthesis?.cancel();
  speakingTimer = window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.78;
    utterance.pitch = 1.08;
    window.speechSynthesis?.speak(utterance);
  }, 250);
}

function renderSetup() {
  clearTimers();
  exitFullscreen();
  app.className = "setup-page";
  app.innerHTML = `
    <section class="setup-card" aria-labelledby="page-title">
      <div class="brand-mark" aria-hidden="true">✦</div>
      <p class="eyebrow">AAC touch practice</p>
      <h1 id="page-title">Touch &amp; Choose</h1>
      <p class="intro">A simple, joyful way to practice making choices on a screen.</p>

      <fieldset>
        <legend>Choose a level</legend>
        <div class="level-list">
          ${[1, 2, 3, 4, 5].map((level) => `
            <label class="level-option ${settings.level === level ? "selected" : ""}">
              <input type="radio" name="level" value="${level}" ${settings.level === level ? "checked" : ""} />
              <span class="level-number">${level}</span>
              <span><strong>${level === 1 ? "One choice" : `${level === 2 ? "Two choices" : level === 3 ? "Two pictures" : level === 4 ? "Three pictures" : "Four pictures"}`}</strong><small>${level === 1 ? "One clear picture" : level === 2 ? "Picture and blank space" : level === 3 ? "Picture with a distractor" : level === 4 ? "Practice left and right" : "Practice all directions"}</small></span>
            </label>`).join("")}
        </div>
      </fieldset>

      <fieldset>
        <legend>Picture topic <span>optional</span></legend>
        <label class="select-wrap">
          <select id="topic-select" aria-label="Picture topic">
            <option value="Random" ${settings.topic === "Random" ? "selected" : ""}>Random</option>
            ${Object.keys(topics).map((topic) => `<option value="${topic}" ${settings.topic === topic ? "selected" : ""}>${topic}</option>`).join("")}
          </select>
        </label>
      </fieldset>

      <button class="start-button" id="start-game">Start practice <span aria-hidden="true">→</span></button>
      <p class="setup-note">The activity continues until you choose Home.</p>
    </section>`;

  app.querySelectorAll("input[name=level]").forEach((input) => {
    input.addEventListener("change", () => {
      settings.level = Number(input.value);
      renderSetup();
    });
  });
  app.querySelector("#topic-select").addEventListener("change", (event) => {
    settings.topic = event.target.value;
    prepareFirstRound();
  });
  app.querySelector("#start-game").addEventListener("click", startRound);
  prepareFirstRound();
}

function createRound(topic) {
  const correct = randomItem(topics[topic]);
  const choiceCount = settings.level === 1 ? 1 : settings.level - 1;
  const distractors = shuffle(topics[topic].filter((item) => item !== correct)).slice(0, choiceCount - 1);
  const choices = settings.level === 2 ? [correct, null] : [correct, ...distractors];
  return { topic, correct, choices: shuffle(choices) };
}

function startRound() {
  clearTimers();
  enterFullscreen();
  gameTopic = preparedFirstRound?.topic ?? (settings.topic === "Random" ? randomItem(Object.keys(topics)) : settings.topic);
  nextRound = preparedFirstRound ?? createRound(gameTopic);
  preparedFirstRound = undefined;
  startRoundWithTopic();
}

function startRoundWithTopic() {
  clearTimers();
  const round = nextRound ?? createRound(gameTopic);
  prepareNextRound();
  const prompt = `Touch the ${round.correct}.`;
  app.className = `play-page level-${settings.level}`;
  app.innerHTML = `
    <button class="home-button" id="home-button" aria-label="Return to teacher setup">Home</button>
    <div class="round" aria-live="polite">
      <p class="prompt">${prompt}</p>
      <div class="choices" role="group" aria-label="${prompt}">
        ${round.choices.map((choice) => choice === null ? `
          <button class="choice blank-choice" data-choice="blank" aria-label="Empty choice"></button>` : `
          <button class="choice" data-choice="${choice}" aria-label="${titleCase(choice)}">
            <img src="${imagePath(round.topic, choice)}" alt="${titleCase(choice)}" />
          </button>`).join("")}
      </div>
    </div>
    <div class="home-dialog" id="home-dialog" hidden role="dialog" aria-modal="true" aria-labelledby="home-title">
      <section>
        <h2 id="home-title">Leave practice?</h2>
        <p>This will return to the teacher setup screen. Type <strong>home</strong> to continue.</p>
        <label class="home-confirm-label" for="home-confirm-input">Type home</label>
        <input class="home-confirm-input" id="home-confirm-input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" />
        <div><button class="dialog-stay" id="stay-button">Keep playing</button><button class="dialog-home" id="confirm-home" disabled>Go Home</button></div>
      </section>
    </div>`;

  const correctButton = app.querySelector(`[data-choice="${round.correct}"]`);
  app.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.choice === round.correct) showReinforcement();
      else showHint(correctButton);
    });
  });
  const homeDialog = app.querySelector("#home-dialog");
  const homeInput = app.querySelector("#home-confirm-input");
  const confirmHome = app.querySelector("#confirm-home");
  app.querySelector("#home-button").addEventListener("click", () => {
    homeInput.value = "";
    confirmHome.disabled = true;
    homeDialog.hidden = false;
    homeInput.focus();
  });
  homeInput.addEventListener("input", () => {
    confirmHome.disabled = homeInput.value.trim().toLowerCase() !== "home";
  });
  homeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !confirmHome.disabled) renderSetup();
  });
  app.querySelector("#stay-button").addEventListener("click", () => { homeDialog.hidden = true; });
  confirmHome.addEventListener("click", renderSetup);

  speak(prompt);
  hintTimer = window.setTimeout(() => showHint(correctButton), 5000);
}

function showHint(button) {
  button.classList.remove("helpful");
  void button.offsetWidth;
  button.classList.add("helpful");
}

function showReinforcement() {
  clearTimers();
  const effect = randomItem(reinforce);
  const folder = "/Reinforcement Sounds and Images";
  const overlay = document.createElement("section");
  overlay.className = "reinforcement";
  overlay.innerHTML = `
    <video autoplay muted playsinline loop aria-label="Celebration animation"><source src="${folder}/${effect}.mp4" type="video/mp4" /></video>
    <p>Wonderful!</p>
    <audio autoplay><source src="${folder}/${effect} audio.mp3" type="audio/mpeg" /></audio>`;
  app.append(overlay);
  reinforcementTimer = window.setTimeout(startRoundWithTopic, 5000);
}

preloadCelebrations();
renderSetup();
