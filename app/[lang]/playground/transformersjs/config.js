export const themeLight = {
  "colors": {
    "surface1": "#ffffff",
    "surface2": "#EFEFEF",
    "surface3": "#F3F3F3",
    "clickable": "#808080",
    "base": "#323232",
    "disabled": "#C5C5C5",
    "hover": "#4D4D4D",
    "accent": "#03045e",
    "error": "#f72585",
    "errorSurface": "#fee9f3"
  },
  "syntax": {
    "plain": "#151515",
    "comment": {
      "color": "#999",
      "fontStyle": "italic"
    },
    "keyword": "#03045e",
    "tag": "#7555bf",
    "punctuation": "#3B3B3B",
    "definition": "#010226",
    "property": "#03045e",
    "static": "#f72585",
    "string": "#3a0ca3"
  },
  "font": {
    "body": "Geist, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "mono": "\"Intel One Mono\", \"DejaVu Sans Mono\", Menlo, Consolas, \"Liberation Mono\", Monaco, \"Lucida Console\", monospace",
    "size": "13px",
    "lineHeight": "20px"
  }
}

export const themeDark = {
  "colors": {
    "surface1": "#151515",
    "surface2": "#252525",
    "surface3": "#2F2F2F",
    "clickable": "#999999",
    "base": "#808080",
    "disabled": "#4D4D4D",
    "hover": "#C5C5C5",
    "accent": "#f72585",
    "error": "#f72585",
    "errorSurface": "#fee9f3"
  },
  "syntax": {
    "plain": "#FFFFFF",
    "comment": {
      "color": "#757575",
      "fontStyle": "italic"
    },
    "keyword": "#f72585",
    "tag": "#82d9f5",
    "punctuation": "#ffffff",
    "definition": "#fca8ce",
    "property": "#f72585",
    "static": "#f72585",
    "string": "#4cc9f0"
  },
  "font": {
    "body": "Geist, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "mono": "\"Intel One Mono\", \"DejaVu Sans Mono\", Menlo, Consolas, \"Liberation Mono\", Monaco, \"Lucida Console\", monospace",
    "size": "13px",
    "lineHeight": "20px"
  }
}

export const editorFiles = {
  "static": {
    "transformersjs": {
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <title>WebNN / Transformers.js in Static HTML5</title>
  <meta charset="UTF-8" />
</head>

<body>
  <h1>WebNN / Transformers.js in Static HTML5</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>
  <button id="run">Run WebNN</button>
  <div id="output">Click "Run WebNN" to start</div>
  <script src="/index.js"></script>
</body>

</html>` },
    },
  },
  "vanilla": {
    "transformersjs": {
      '/index.js': {
        code: `document.getElementById("app").innerHTML = '// Transformers.js + Vanilla JavaScript';
`}
    },
  },
  "svelte": {
    "transformersjs": {
      '/App.svelte': {
        code: `<script>
  let name = '// Transformers.js + Svelte';
</script>

<main>
  {name}
</main>
`}
    },
  },
  "react": {
    "transformersjs": {
      '/App.js': {
        code: `export default function App() {
  return <div>// Transformers.js + React</div>
}`},
    },
  },
  "vue": {
    "transformersjs": {
      '/src/App.vue': {
        code: `<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('// Transformers.js + Vue');
</script>
`},
    },
  },
}