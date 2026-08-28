// The teacher's setup choices. They outlive a practice session so returning
// Home lands back on the same level and topic.
export const settings = $state({ level: 1, topic: "Random" });

export const levels = [
  { value: 1, title: "One choice", detail: "One clear picture" },
  { value: 2, title: "Two choices", detail: "Picture and blank space" },
  { value: 3, title: "Two pictures", detail: "Picture with a distractor" },
  { value: 4, title: "Three pictures", detail: "Practice left and right" },
  { value: 5, title: "Four pictures", detail: "Practice all directions" },
];
