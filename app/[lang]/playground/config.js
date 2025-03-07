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
  "vanilla": {
    "webnn" : {
      'index.js': { code: `async function runWebNN() {
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
  // [1, 1, 1, 1]
  const output = document.querySelector('#output')
  output.innerText = 'Output value: ' + new Float32Array(result);
}

runWebNN();
        `
       },
      'index.html': { code: `<!DOCTYPE html>
<html>

<head>
  <title>WebNN API</title>
  <meta charset="UTF-8" />
</head>

<body>
  <h1>WebNN API</h1>
  <div id="output"></div>
  <script src="./index.js" />
</body>

</html>` },
    },
    "ort": {
      'index.js': { code: `// ONNX Runtime Web + Vanilla JavaScript` },
    },
    "transformersjs" : {
      'index.js': { code: `// Transformers.js + Vanilla JavaScript` },
    }
  },
  "svelte": {
    "webnn" : {
      'index.js': { code: `export async function runWebNN() {
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
      'App.svelte': { code: `<script>
  import { onMount } from 'svelte';
  import { runWebNN } from './index.js';
  
  let result = "";
  
  onMount(async () => {
    try {
      result = await runWebNN();
    } catch (error) {
      result = \`Error: ${error.message}\`;
    }
  });
</script>

<main>
  <h1>WebNN Example</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>
  
  <div id="output">
    {#if result}
      Output value: {result}
    {:else}
      Computing...
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    padding: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  #output {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-family: monospace;
  }
</style>` }
    },
    "ort": {
      'index.js': { code: `// ONNX Runtime Web + Svelte` },
    },
    "transformersjs" : {
      'index.js': { code: `// Transformers.js + Svelte` },
    }
  },
  "react": {
    "webnn" : {
      'index.js': { code: `export async function runWebNN() {
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
'App.js': { code: `import React, { useState, useEffect } from 'react';
import { runWebNN } from './index.js';

function App() {
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const webNNResult = await runWebNN();
        setResult(webNNResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, []);

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>WebNN Example</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>
      
      <div id="output" style={styles.output}>
        {loading ? (
          "Computing..."
        ) : error ? (
          \`Error: ${error}\`
        ) : (
          \`Output value: ${result}\`
        )}
      </div>
    </div>
  );
}

// Inline styles for the component
const styles = {
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
  heading: {
    color: '#333',
    textAlign: 'center',
  },
  output: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    fontFamily: 'monospace',
  }
};

export default App;` }
    },
    "ort": {
      'index.js': { code: `// ONNX Runtime Web + React` },
    },
    "transformersjs" : {
      'index.js': { code: `// Transformers.js + React` },
    }
  },
  "vue": {
    "webnn" : {
      'index.js': { code: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')` },
      'App.vue': { code: `<template>
  <div>
    <h1>WebNN in Vue.js</h1>
    <button @click="runWebNN">Run WebNN Computation</button>
    <div id="output">{{ outputText }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      outputText: 'Click the button to run computation'
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
</script>

<style scoped>
#output {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}
</style>` }
    },
    "ort": {
      'index.js': { code: `// ONNX Runtime Web + Vue` },
    },
    "transformersjs" : {
      'index.js': { code: `// Transformers.js + Vue` },
    }
  },
}