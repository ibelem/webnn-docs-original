
export const transformersjsEditorFiles = {
  "image-classification-mobilenet-v2": {
    "title": "Image Classification (MobileNet v2)",
    "description": "An image classification demo using WebNN and ONNX Runtime Web",
    "static": {
      '/index.html': {
        code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebNN / Transformers.js in Static HTML5</title>
    <link rel="stylesheet" href="./styles.css" />
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
    <script type="module" src="./webnn.js"></script>
    <script>
      function updateImage() {
        const selector = document.querySelector('#imageSelector');
        const image = document.querySelector('#selectedImage');
        image.src = selector.value;
      }
    </script>
  </body>
</html>`},
      '/webnn.js': {
        active: true,
        code: `import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

async function classifyImage() {
  const options = {
      dtype: 'fp16',
      device: 'webnn-gpu', // 'webnn-cpu' and 'webnn-npu'
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
      div.innerHTML = item.label + ": " + (item.score * 100).toFixed(2) + "%";
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
  margin: 0.5rem 0;
  padding: 0.5rem 0;
}

button {
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
}`},
    },
    "vanilla": {
      '/index.html': { code: ``},
      '/index.js': {
        active: true,
        code: `document.getElementById("app").innerHTML = '// Transformers.js + Vanilla JavaScript';
`},
'/styles.css': { code: ``},
    },
    "svelte": {
      '/webnn.js': { code: ``},
      '/App.svelte': {
        active: true,
        code: `<script>
  let name = '// Transformers.js + Svelte';
</script>

<main>
  {name}
</main>`},
'/styles.css': { code: ``},
    },
    "react": {
      '/webnn.js': { code: ``},
      '/App.js': {
        active: true,
        code: `export default function App() {
  return <div>// Transformers.js + React</div>
}`},
    },
    "vue": {
      '/src/webnn.js': { code: ``},
      '/src/App.vue': {
        active: true,
        code: `<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('// Transformers.js + Vue');
</script>
`},
    },
  }

}