import "./style.css";

const topics = {
  Animals: ["bear", "bird", "butterfly", "cat", "dog", "elephant", "fish", "frog", "monkey", "pig", "sheep", "turtle"],
  Food: ["apple", "banana", "blueberries", "bread", "broccoli", "carrot", "cookie", "egg", "rice", "water"],
  Body: ["arm", "brain", "ear", "eyes", "feet", "hair", "hand", "teeth", "tongue"],
  Clothing: ["pants", "shirt", "shoes", "socks", "sunglasses"],
  Home: ["bed", "door", "sink", "table", "toilet", "window"],
  People: ["astronaut", "builder", "cook", "dancer", "doctor", "farmer", "firefighter", "painter", "pilot", "scientist"],
  School: ["backpack", "bus", "crayons", "desk", "eraser", "glue", "paper", "pencil", "scissors", "tape"],
  Toys: ["baby", "ball", "bike", "bubbles", "dinosaur", "food", "lego", "playdoh", "shovel", "train", "truck"],
};

const imageExtensions = {
  Body: { arm: "png", ear: "png", hand: "jpg", brain: "png" },
  Food: { banana: "png", broccoli: "png" },
  People: { astronaut: "svg", scientist: "svg", dancer: "png", builder: "png", cook: "png", doctor: "png", farmer: "png", firefighter: "png", painter: "png", pilot: "jpg" },
  School: { backpack: "png", bus: "png", crayons: "png", desk: "png", eraser: "png", glue: "png", paper: "png", pencil: "png", scissors: "png", tape: "png" },
};

const reinforce = ["bubbles", "fireworks", "sparkles", "spin", "stars"];
const app = document.querySelector("#app");
let settings = { level: 1, topic: "Random" };
let hintTimer;
let reinforcementTimer;
let speakingTimer;

function titleCase(word) {
  return word.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function imagePath(topic, word) {
  const extension = imageExtensions[topic]?.[word] ?? (topic === "School" ? "png" : "jpg");
  return `/${topic}/${word}.${extension}`;
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
            <option value="Random">A little of everything</option>
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
  });
  app.querySelector("#start-game").addEventListener("click", startRound);
}

function createRound() {
  const topic = settings.topic === "Random" ? randomItem(Object.keys(topics)) : settings.topic;
  const correct = randomItem(topics[topic]);
  const choiceCount = settings.level === 1 ? 1 : settings.level === 5 ? 4 : settings.level;
  const distractors = shuffle(topics[topic].filter((item) => item !== correct)).slice(0, choiceCount - 1);
  const choices = settings.level === 2 ? [correct, null] : [correct, ...distractors];
  return { topic, correct, choices: shuffle(choices) };
}

function startRound() {
  clearTimers();
  const round = createRound();
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
        <p>This will return to the teacher setup screen.</p>
        <div><button class="dialog-stay" id="stay-button">Keep playing</button><button class="dialog-home" id="confirm-home">Go Home</button></div>
      </section>
    </div>`;

  const correctButton = app.querySelector(`[data-choice="${round.correct}"]`);
  app.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.choice === round.correct) showReinforcement();
      else showHint(correctButton);
    });
  });
  app.querySelector("#home-button").addEventListener("click", () => { app.querySelector("#home-dialog").hidden = false; });
  app.querySelector("#stay-button").addEventListener("click", () => { app.querySelector("#home-dialog").hidden = true; });
  app.querySelector("#confirm-home").addEventListener("click", renderSetup);

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
  reinforcementTimer = window.setTimeout(startRound, 5000);
}

renderSetup();
