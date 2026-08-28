// The teacher's setup choices. They outlive a practice session so returning
// Home lands back on the same level and topic.
export const settings = $state({ level: 1, topic: "Random" });

export const levels = [
  { value: 1, title: "One choice", detail: "One clear picture" },
  { value: 2, title: "Picture + empty space", detail: "Only one picture can be chosen" },
  { value: 3, title: "Two picture choices", detail: "Choose between two pictures" },
  { value: 4, title: "Three pictures", detail: "Practice left and right" },
  { value: 5, title: "Four pictures", detail: "Practice all directions" },
];
