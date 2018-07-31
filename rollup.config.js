import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import clean from "rollup-plugin-cleanup";
import sass from "rollup-plugin-collect-sass";
import json from "rollup-plugin-json";

const app = {
  input: "src/main.js",
  output: {
    file: "public/js/main.js",
    format: "iife"
  },
  plugins: [
    json(),
    sass({
      importOnce: true,
      extract: "public/css/main.css"
    }),
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    cjs({
      include: "node_modules/**",
      exclude: "node_modules/process-es6/**"
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: [".js", ".jsx"]
    }),
    babel({
      exclude: ["node_modules/**"]
    }),
    clean()
  ]
};

export default [app];
