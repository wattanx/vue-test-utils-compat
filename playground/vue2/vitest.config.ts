import { defineConfig } from "vitest/config";
import Vue2 from "@vitejs/plugin-vue2";
import VueTestUtils from "@wattanx/vite-plugin-vue-test-utils-compat";

export default defineConfig({
  // @ts-ignore
  plugins: [Vue2(), VueTestUtils()],
  test: {
    globals: true,
    environment: "jsdom",
    alias: [{ find: /^vue$/, replacement: "vue/dist/vue.runtime.common.js" }],
  },
});
