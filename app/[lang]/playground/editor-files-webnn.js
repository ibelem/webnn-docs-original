
export const webnnEditorFiles = {
  "add-mul": {
    "title": "C = 0.2 * A + B",
    "description": "Compute the element-wise binary addition and multiplication of the two input tensors",
    "static": {
      '/webnn.js': {
        active: true,
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
  <link rel="stylesheet" href="./styles.css" />
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
  <script src="./webnn.js"></script>
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
    "vanilla": {
      '/webnn.js': {
        active: true,
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
  <script src="./webnn.js"></script>
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
    "svelte": {
      '/webnn.js': {
        active: true,
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
    "react": {
      '/webnn.js': {
        active: true,
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
    },
    "vue": {
      '/src/webnn.js': { code: ``},
      '/src/App.vue': {
        active: true,
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
    },
  },
  "conv2d": {
    "title": "conv2d",
    "description": "Compute a 2-D convolution given 4-D input and filter tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Simple WebNN Conv2D Example
async function runSimpleConv2dExample() {
  // Check if WebNN is supported
  if (!('ml' in navigator)) {
    console.error('WebNN API is not supported in this browser');
    return;
  }

  try {
    // Get the WebNN context
    const context = await navigator.ml.createContext({deviceType: 'gpu'});
    const builder = new MLGraphBuilder(context);

    // Use a simple 4x4 input with 1 channel
    const inputShape = [1, 4, 4, 1]; // [batch, height, width, channels]
    
    // Create a simple 4x4 input matrix
    const inputData = new Float32Array([
      1, 2, 3, 4,   // First row
      5, 6, 7, 8,   // Second row
      9, 10, 11, 12, // Third row
      13, 14, 15, 16 // Fourth row
    ]);
    
    // Define the input operand
    const input = builder.input('input', {dataType: 'float32', shape: inputShape});
    
    // Simple 3x3 filter with 1 output channel
    const filterShape = [1, 3, 3, 1]; // [outputChannels, filterHeight, filterWidth, inputChannels]
    
    // Create a simple filter kernel for edge detection
    const filterData = new Float32Array([
      1, 0, -1, 
      2, 0, -2, 
      1, 0, -1
    ]);
    
    // Define the filter operand
    const filter = builder.constant({dataType: 'float32', shape: filterShape}, filterData);
    
    // Define a simple bias (one value per output channel)
    const biasShape = [1]; // One bias for one output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = builder.constant({dataType: 'float32', shape: biasShape}, biasData);
    
    // Define Conv2D options with 'same' padding
    const options = {
      padding: [1, 1, 1, 1], // [top, right, bottom, left]
      strides: [1, 1],       // [y, x]
      dilations: [1, 1],     // [y, x]
      groups: 1              // Standard convolution
    };
    
    // Create the Conv2D operation
    const conv = builder.conv2d(input, filter, bias, options);
    
    // Build the computation graph
    const graph = await builder.build({conv});
    
    // Create input tensor
    const inputTensor = new MLTensor(inputData, {dataType: 'float32', shape: inputShape});
    
    // Run the graph with the input tensor
    const outputs = await context.dispatch(graph, {'input': inputTensor});
    
    // Get the output tensor
    const outputTensor = outputs.values().next().value;
    const outputData = await outputTensor.data();
    const outputShape = outputTensor.shape;
    
    console.log('Input shape:', inputShape);
    console.log('Input data:', Array.from(inputData));
    console.log('Filter data (edge detection):', Array.from(filterData));
    console.log('Output shape:', outputShape);
    console.log('Output data:', Array.from(outputData));
    
    // Return the results for display
    return {
      input: {
        shape: inputShape,
        data: Array.from(inputData)
      },
      filter: Array.from(filterData),
      output: {
        shape: outputShape,
        data: Array.from(outputData)
      }
    };
  } catch (error) {
    console.error('WebNN error:', error);
  }
}

// Display the results in a friendly format
function displayResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  
  // Format the input as a grid
  let inputGrid = '';
  const inputSize = Math.sqrt(results.input.data.length);
  for (let i = 0; i < inputSize; i++) {
    const row = [];
    for (let j = 0; j < inputSize; j++) {
      row.push(results.input.data[i * inputSize + j]);
    }
    inputGrid += row.join(' ') + '<br>';
  }
  
  // Format the filter as a grid
  let filterGrid = '';
  const filterSize = Math.sqrt(results.filter.length);
  for (let i = 0; i < filterSize; i++) {
    const row = [];
    for (let j = 0; j < filterSize; j++) {
      row.push(results.filter[i * filterSize + j]);
    }
    filterGrid += row.join(' ') + '<br>';
  }
  
  // Format the output as a grid
  let outputGrid = '';
  const outputSize = Math.sqrt(results.output.data.length);
  for (let i = 0; i < outputSize; i++) {
    const row = [];
    for (let j = 0; j < outputSize; j++) {
      row.push(results.output.data[i * outputSize + j].toFixed(1));
    }
    outputGrid += row.join(' ') + '<br>';
  }
  
  resultDiv.innerHTML = '<h3>Conv2D Results</h3><div class="grid-container"><div class="grid-item"><h4>Input (4x4)</h4><div class="grid">'+ inputGrid + '</div></div><div class="grid-item"><h4>Filter (3x3 Edge Detection)</h4><div class="grid">'+ inputGrid + '</div></div><div class="grid-item"><h4>Output (4x4)</h4><div class="grid">'+ inputGrid + '</div></div></div>';
}

// Run the example when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running simple Conv2D with WebNN...';
  }
  
  try {
    const results = await runSimpleConv2dExample();
    if (results) {
      displayResults(results);
      if (statusDiv) {
        statusDiv.textContent = 'Conv2D completed successfully!';
      }
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
});`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>conv2d op - WebNN</title>
  <style>
    .grid-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .grid {
      font-family: monospace;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <h1>WebNN Conv2D</h1>
  <div id="status"></div>
  <div id="result"></div>
  <script src="./webnn.js"></script>
</body>
</html>` },
      '/styles.css': {
        code: ``}
    },
  }
}