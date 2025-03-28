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
    "webnn": {
      '/index.js': {
        code: `async function runWebNN() {
  const descriptor = {dataType: 'float32', shape: [2, 2]};
  const context = await navigator.ml.createContext();
  const builder = new MLGraphBuilder(context);

  // 1. Create a computational graph 'C = 0.2 * A + B'.
  const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
  const A = builder.input('A', descriptor);
  const B = builder.input('B', descriptor);
  const C = builder.add(builder.mul(A, constant), B);

  // 2. Compile the graph.
  const graph = await builder.build({'C': C});

  // 3. Create reusable input and output tensors.
  const [inputTensorA, inputTensorB, outputTensorC] =
    await Promise.all([
      context.createTensor({
        dataType: A.dataType, shape: A.shape, writable: true
      }),
      context.createTensor({
        dataType: B.dataType, shape: B.shape, writable: true
      }),
      context.createTensor({
        dataType: C.dataType, shape: C.shape, readable: true
      })
    ]);

  // 4. Initialize the inputs.
  context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
  context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));

  // 5. Execute the graph.
  const inputs = {
    'A': inputTensorA,
    'B': inputTensorB
  };
  const outputs = {
    'C': outputTensorC
  };
  context.dispatch(graph, inputs, outputs);
    
  // 6. Read back the computed result.
  const result = await context.readTensor(outputTensorC);
  return new Float32Array(result).toString();
}

document.querySelector("#run").addEventListener("click", async () => {
  const output = document.querySelector("#output");
  output.textContent = "Inferencing...";
  try {
    const result = await runWebNN();
    output.textContent = 'Output value: ' + result;
  } catch (error) {
    output.textContent = 'Error: ' + error.message;
  }
});`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <title>WebNN in Static HTML5</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <h1>WebNN in Static HTML5</h1>
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
      '/styles.css': {
        code: `body {
  font-family: 'Intel One Mono', 'Trebuchet MS', sans-serif;
  padding: 0 1rem;
}

h1 {
  color: #E44D26;
}

button {
  margin: 0.5rem 0;
}`}
    },
  },
  "vanilla": {
    "webnn": {
      '/index.js': {
        code: `import "./styles.css";

async function runWebNN() {
  const descriptor = {dataType: 'float32', shape: [2, 2]};
  const context = await navigator.ml.createContext();
  const builder = new MLGraphBuilder(context);

  // 1. Create a computational graph 'C = 0.2 * A + B'.
  const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
  const A = builder.input('A', descriptor);
  const B = builder.input('B', descriptor);
  const C = builder.add(builder.mul(A, constant), B);

  // 2. Compile the graph.
  const graph = await builder.build({'C': C});

  // 3. Create reusable input and output tensors.
  const [inputTensorA, inputTensorB, outputTensorC] =
    await Promise.all([
      context.createTensor({
        dataType: A.dataType, shape: A.shape, writable: true
      }),
      context.createTensor({
        dataType: B.dataType, shape: B.shape, writable: true
      }),
      context.createTensor({
        dataType: C.dataType, shape: C.shape, readable: true
      })
    ]);

  // 4. Initialize the inputs.
  context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
  context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));

  // 5. Execute the graph.
  const inputs = {
    'A': inputTensorA,
    'B': inputTensorB
  };
  const outputs = {
    'C': outputTensorC
  };
  context.dispatch(graph, inputs, outputs);
    
  // 6. Read back the computed result.
  const result = await context.readTensor(outputTensorC);
  return new Float32Array(result).toString();
}

document.querySelector("#run").addEventListener("click", async () => {
  const output = document.querySelector("#output");
  output.textContent = "Inferencing...";
  try {
    const result = await runWebNN();
    output.textContent = 'Output value: ' + result;
  } catch (error) {
    output.textContent = 'Error: ' + error.message;
  }
});`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <title>WebNN in Vanilla JavaScript</title>
  <meta charset="UTF-8" />
</head>

<body>
  <h1>WebNN in Vanilla JavaScript</h1>
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
  <script src="./index.js"></script>
</body>

</html>` },
      '/styles.css': {
        code: `body {
  font-family: 'Intel One Mono', 'Trebuchet MS', sans-serif;
  padding: 0 1rem;
}

h1 {
  color: #F7DF1E;
}

button {
  margin: 0.5rem 0;
}`}
    },
  },
  "svelte": {
    "webnn": {
      '/webnn.js': {
        code: `export async function runWebNN() {
  try {
    const descriptor = { dataType: 'float32', shape: [2, 2] };
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    
    // 1. Create a computational graph 'C = 0.2 * A + B'.
    const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
    const A = builder.input('A', descriptor);
    const B = builder.input('B', descriptor);
    const C = builder.add(builder.mul(A, constant), B);
    
    // 2. Compile the graph.
    const graph = await builder.build({ 'C': C });
    
    // 3. Create reusable input and output tensors.
    const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
      context.createTensor({
        dataType: A.dataType, 
        shape: A.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: B.dataType, 
        shape: B.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: C.dataType, 
        shape: C.shape, 
        readable: true
      })
    ]);
    
    // 4. Initialize the inputs.
    context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
    context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
    
    // 5. Execute the graph.
    const inputs = {
      'A': inputTensorA,
      'B': inputTensorB
    };
    const outputs = {
      'C': outputTensorC
    };
    await context.dispatch(graph, inputs, outputs);
    
    // 6. Read back the computed result.
    const result = await context.readTensor(outputTensorC);
    return new Float32Array(result).toString();
  } catch (error) {
    console.error("WebNN error:", error);
    throw error;
  }
}` },
      '/App.svelte': {
        code: `<script>
  import { runWebNN } from './webnn.js';
  let result = $state("");
  async function run() {
    try {
      result = "Computing...";
      result = await runWebNN();
    } catch (error) {
      result = 'Error: ' + error.message;
    }
  }
</script>

<main>
  <h1>WebNN in Svelte</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>

  <button onclick={run}>Run WebNN</button>

  <div id="output">
    {#if result}
      <p>Output value: {result}</p>
    {:else}
      <p>Click "Run WebNN" to start</p>
    {/if}
  </div>
</main>` },
      '/styles.css': {
        code: `main {
  padding: 0 1rem;
  font-family: 'Intel One Mono', 'Helvetica Neue', sans-serif;
}

h1 {
  color: #ff3e00;
}

button {
  margin: 0.5rem 0;
}` },
    },
  },
  "react": {
    "webnn": {
      '/webnn.js': {
        code: `export async function runWebNN() {
  try {
    const descriptor = { dataType: 'float32', shape: [2, 2] };
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    
    // 1. Create a computational graph 'C = 0.2 * A + B'.
    const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
    const A = builder.input('A', descriptor);
    const B = builder.input('B', descriptor);
    const C = builder.add(builder.mul(A, constant), B);
    
    // 2. Compile the graph.
    const graph = await builder.build({ 'C': C });
    
    // 3. Create reusable input and output tensors.
    const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
      context.createTensor({
        dataType: A.dataType, 
        shape: A.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: B.dataType, 
        shape: B.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: C.dataType, 
        shape: C.shape, 
        readable: true
      })
    ]);
    
    // 4. Initialize the inputs.
    context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
    context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
    
    // 5. Execute the graph.
    const inputs = {
      'A': inputTensorA,
      'B': inputTensorB
    };
    const outputs = {
      'C': outputTensorC
    };
    await context.dispatch(graph, inputs, outputs);
    
    // 6. Read back the computed result.
    const result = await context.readTensor(outputTensorC);
    return new Float32Array(result).toString();
  } catch (error) {
    console.error("WebNN error:", error);
    throw error;
  }
}` },
      '/App.js': {
        code: `import React, { useState } from 'react';
import { runWebNN } from './webnn.js';

export default function App() {
  const [result, setResult] = useState('Click "Run WebNN" to start');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRunWebNN() {
    setLoading(true);
    setError(null);
    setResult("");

    try {
      const webNNResult = await runWebNN();
      setResult(webNNResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>WebNN in React.js</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>

      <button style={styles.button} onClick={handleRunWebNN} disabled={loading}>
        {loading ? "Computing..." : "Run WebNN"}
      </button>

      <div id="output">
        {error ? <p style={{ color: "red" }}>Error: {error}</p> : result && <p>Output value: {result}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 1rem',
    fontFamily: '"Intel One Mono", "Helvetica Neue", sans-serif',
  },
  heading: {
    color: '#61DAFB',
  },
  button: {
    cursor: 'pointer',
    margin: '0.5rem 0',
  }
};` }
    }
  },
  "vue": {
    "webnn": {
      '/src/App.vue': {
        code: `<template>
  <div>
      <h1>WebNN in Vue.js</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>
    <button @click="runWebNN">Run WebNN</button>
    <div id="output">{{ outputText }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      outputText: 'Click "Run WebNN" to start'
    }
  },
  methods: {
    async runWebNN() {
      try {
        const descriptor = {dataType: 'float32', shape: [2, 2]};
        const context = await navigator.ml.createContext();
        const builder = new MLGraphBuilder(context);
        
        // 1. Create a computational graph 'C = 0.2 * A + B'.
        const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
        const A = builder.input('A', descriptor);
        const B = builder.input('B', descriptor);
        const C = builder.add(builder.mul(A, constant), B);
        
        // 2. Compile the graph.
        const graph = await builder.build({'C': C});
        
        // 3. Create reusable input and output tensors.
        const [inputTensorA, inputTensorB, outputTensorC] = 
          await Promise.all([
            context.createTensor({
              dataType: A.dataType, shape: A.shape, writable: true
            }),
            context.createTensor({
              dataType: B.dataType, shape: B.shape, writable: true
            }),
            context.createTensor({
              dataType: C.dataType, shape: C.shape, readable: true
            })
          ]);
        
        // 4. Initialize the inputs.
        context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
        context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
        
        // 5. Execute the graph.
        const inputs = {
          'A': inputTensorA,
          'B': inputTensorB
        };
        const outputs = {
          'C': outputTensorC
        };
        await context.dispatch(graph, inputs, outputs);
        
        // 6. Read back the computed result.
        const result = await context.readTensor(outputTensorC);
        this.outputText = 'Output value: ' + new Float32Array(result);
      } catch (error) {
        this.outputText = 'Error: ' + error.message;
        console.error('WebNN error:', error);
      }
    }
  }
}
</script>` },
      '/src/styles.css': {
        code: `#app {
  font-family: 'Intel One Mono', 'Helvetica Neue', sans-serif;
  padding: 0 1rem;
}

h1 {
  color: #41B883;
}
  
button {
  margin: 0.5rem 0;
}`},
    }
  },
}