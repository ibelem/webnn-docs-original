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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebNN / Transformers.js in Static HTML5</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main>
      <h2>Image Classification - WebNN / Transformers.js in HTML5</h2>     
      <select id="imageSelector" onchange="updateImage()">
        <option value="https://webmachinelearning.github.io/webnn-samples/image_classification/images/test.jpg">Image 1</option>
        <option value="https://microsoft.github.io/webnn-developer-preview/Get%20Started/WebNN%20Tutorial/images/chameleon.jpg">Image 2</option>
        <option value="https://webmachinelearning.github.io/webnn-samples/selfie_segmentation/images/test.jpg">Image 3</option>
        <option value="https://webmachinelearning.github.io/webnn-samples/object_detection/images/test.jpg">Image 4</option>
      </select>
      <div>
        <img id="selectedImage" src="https://webmachinelearning.github.io/webnn-samples/image_classification/images/test.jpg" alt="Selected Image" />
      </div>
      <button id="classify" type="button">Click Me to Classify Image!</button>
      <div id="outputText">This image displayed is: </div>
    </main>
    <script type="module" src="./index.js"></script>
    <script>
      function updateImage() {
        const selector = document.querySelector('#imageSelector');
        const image = document.querySelector('#selectedImage');
        image.src = selector.value;
      }
    </script>
  </body>
</html>`},
      '/index.js': {
        code: `import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

async function classifyImage() {
  const options = {
      dtype: 'fp16',
      device: 'webnn-gpu', // 'webnn-cpu' and upcoming 'webnn-npu'
      session_options: {
        freeDimensionOverrides: {
          batch_size: 1,
        }
      },
    };
  const url = document.querySelector('#selectedImage').src;
  const classifier = await pipeline('image-classification', 'webnn/mobilenet-v2', options);
  const output = await classifier(url, { top_k: 3 });
  console.log(output); // Print predictions to console

  const outputElement = document.querySelector("#outputText");
  outputElement.innerHTML = ""; // Clear previous content
  // Display prediction in HTML
  output.forEach(item => {
      const div = document.createElement("div");
      div.className = "result";
      div.innerHTML = "<strong>" + item.label + "</strong>: " + (item.score * 100).toFixed(2) + "%";
      outputElement.appendChild(div);
  });
}

document.querySelector('#classify').addEventListener('click', classifyImage, false);`},
'/styles.css': {
  code: `body {
  font-family: 'Intel One Mono', 'Trebuchet MS', sans-serif;
  padding: 0 1rem;
}

h1, h2 {
  color: #eb6424; 
}

select {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
}

select option {
  padding: 0.2rem 0.5rem;
}

img {
  width: 40%;
  height: auto;
}

#outputText {
  color: #eb6424; 
}

button {
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
}
  
#result {
  margin: 0.5rem 0;
  padding: 0.5rem;
}`},
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