import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  externals: ["vite", "@vue/test-utils"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
});
