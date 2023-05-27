import type { Plugin } from "vite";

const compatNames = ["mount", "shallowMount"];

function VueTestUtilsCompatPlugin(): Plugin {
  function transform(code: string, id: string) {
    if (!compatNames.some((n) => code.includes(n))) return;
    if (id.includes("/node_modules/")) return;

    // @ts-ignore
    let ast: AcornNode;
    try {
      // @ts-ignore
      ast = this.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        ranges: true,
      });
    } catch (e) {
      return;
    }

    return code;
  }

  return {
    name: "vite-plugin-vue-test-utils",
    transform,
  };
}

export { VueTestUtilsCompatPlugin as default };
export * from "./runtime/compat";
