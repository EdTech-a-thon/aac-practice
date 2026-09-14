// The teacher's setup choices. They outlive a practice session so returning
// Home lands back on the same level and topic.
export const settings = $state({
  level: 1,
  topic: "Random",
  showPictureNames: false,
  pictureBackground: null,
  rewardEnabled: true,
  rewardSeconds: 5,
  hintEnabled: true,
  hintSeconds: 10,
});

// `title` and `detail` are translation keys, not text — look them up with
// t() from $lib/i18n. The wording lives in src/lib/i18n/en.js.
export const levels = [
  { value: 1, title: "level.1.title", detail: "level.1.detail" },
  { value: 2, title: "level.2.title", detail: "level.2.detail" },
  { value: 3, title: "level.3.title", detail: "level.3.detail" },
  { value: 4, title: "level.4.title", detail: "level.4.detail" },
  { value: 5, title: "level.5.title", detail: "level.5.detail" },
];
