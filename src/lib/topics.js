// The picture sets a round can be drawn from. Every word here needs a matching
// file under static/<topic>/ — see scripts/optimize-images.sh.
export const topics = {
  Animals: ["bear", "bird", "butterfly", "cat", "dog", "elephant", "fish", "frog", "monkey", "pig", "sheep", "turtle"],
  Colors: ["blue", "brown", "green", "gray", "orange", "pink", "purple", "red", "yellow"],
  Food: ["apple", "banana", "blueberries", "bread", "broccoli", "carrot", "cookie", "egg", "rice", "water"],
  Body: ["arm", "brain", "ear", "eyes", "feet", "hair", "hand", "teeth", "tongue"],
  Clothing: ["pants", "shirt", "shoes", "socks", "sunglasses"],
  Home: ["bed", "door", "sink", "table", "toilet", "window"],
  People: ["astronaut", "builder", "cook", "dancer", "doctor", "farmer", "firefighter", "painter", "pilot", "scientist"],
  School: ["backpack", "bus", "crayons", "desk", "eraser", "glue", "paper", "pencil", "scissors", "tape"],
  Toys: ["baby", "ball", "bike", "bubbles", "dinosaur", "food", "lego", "playdoh", "shovel", "train", "truck"],
  Shapes: ["circle", "square", "rectangle", "triangle", "oval", "diamond", "star", "heart", "pentagon", "hexagon"],
  // Each adjective is paired with its opposite, so a round asks the learner to
  // compare two pictures that differ in only one way.
  Adjectives: ["big", "small", "tall", "short", "hot", "cold", "full", "empty", "open", "closed", "happy", "sad"],
  Numbers: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
  Letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
};

export const topicNames = Object.keys(topics);

// These topics are drawn rather than photographed, so the whole folder is svg.
// Numbers and Letters are written by scripts/make-glyph-images.sh.
const svgTopics = new Set(["Shapes", "Adjectives", "Numbers", "Letters"]);

// A couple of pictures stayed vector because tracing them to webp lost detail.
const svgImages = new Set(["People/astronaut", "People/scientist"]);

export function imagePath(topic, word) {
  const isVector = svgTopics.has(topic) || svgImages.has(`${topic}/${word}`);
  return `/${topic}/${word}.${isVector ? "svg" : "webp"}`;
}

export function titleCase(word) {
  return word.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
