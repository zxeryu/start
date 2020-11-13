import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        entryFileNames: "[name].es.js",
        chunkFileNames: "[name]-[hash].es.js",
      },
    ],
    plugins: [
      commonjs(),
      resolve({
        extensions: [".ts", ".js"],
      }),
      babel({
        configFile: "../../babel.config.json",
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
      }),
    ],
    external: ["lodash", "rxjs", "localforage"],
  },
  {
    input: "../../.tmp/@bridge-start/persist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
