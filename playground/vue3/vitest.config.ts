import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import VueTestUtils from "@wattanx/vite-plugin-vue-test-utils-compat";

export default defineConfig({
  // @ts-ignore
  plugins: [Vue(), VueTestUtils()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
