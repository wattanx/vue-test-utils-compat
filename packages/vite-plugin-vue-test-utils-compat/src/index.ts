import type { Plugin } from "vite";
import { walk } from "estree-walker";
import type { Identifier } from "estree";
import type { AcornNode } from "rollup";
import MagicString from "magic-string";

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

    const s = new MagicString(code);

    walk(ast as any, {
      enter(node) {
        if (
          node.type === "ImportDeclaration" &&
          node.source.value === "@wattanx/vite-plugin-vue-test-utils-compat"
        ) {
          const source = node.source;
          s.overwrite(source.range![0], source.range![1], "'@vue/test-utils'");
        }

        // props -> propsData
        if (
          node.type === "CallExpression" &&
          node.callee.type === "Identifier" &&
          compatNames.includes(node.callee.name)
        ) {
          const argument = node.arguments[1];
          if (argument.type === "ObjectExpression") {
            const properties = argument.properties;
            const propsData = properties.find(
              (p) =>
                p.type === "Property" &&
                p.key.type === "Identifier" &&
                p.key.name === "props"
            );
            if (propsData?.type === "Property") {
              const key = propsData.key as Identifier;
              s.overwrite(key.range![0], key.range![1], "propsData");
            }
          }
        }
      },
    });

    return {
      code: s.toString(),
      map: s.generateMap(),
    };
  }

  return {
    name: "vite-plugin-vue-test-utils",
    transform,
  };
}

export { VueTestUtilsCompatPlugin as default };
export * from "./runtime/compat";
