import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// Touch & Choose is a pure browser activity with no server of its own, so the
// build is a plain folder of files any static host can serve.
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: "dist", assets: "dist", fallback: "index.html" }),
  },
};
