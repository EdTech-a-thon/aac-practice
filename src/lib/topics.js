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
};

export const topicNames = Object.keys(topics);

// A couple of pictures stayed vector because tracing them to webp lost detail.
const svgImages = new Set(["People/astronaut", "People/scientist"]);

export function imagePath(topic, word) {
  const extension = svgImages.has(`${topic}/${word}`) ? "svg" : "webp";
  return `/${topic}/${word}.${extension}`;
}

export function titleCase(word) {
  return word.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
