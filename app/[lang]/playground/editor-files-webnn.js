
export const webnnEditorFiles = {
  "hello-world": {
    "title": "Hello WebNN",
    "description": "Hello WebNN",
    "static": {
      '/webnn.js': {
        active: true,
        code: `async function webnn() {
  const status = document.querySelector('#status');
  let message = '';
  if (!('ml' in navigator)) {
    message = 'ml in navigator: false<br/>';
  }
  try {
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    message = 'WebNN API is supported in this browser';
   } catch (error) {
    message += error.message + '<br/>';
    message += 'WebNN API is not supported in this browser';
  }
  status.innerHTML = message;
  console.log(message);
}

document.addEventListener('DOMContentLoaded', webnn, false);`},
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Hello WebNN</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
</head>
<body>
    <h1>Hello WebNN</h1>
    <p id="status"></p>
    <script src="./webnn.js"></script>
</body>
</html>`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}`}
    },
    "vanilla": {
      '/index.js': {
        active: true,
        code: `import "./styles.css";

async function webnn() {
  let message = '';
  if (!('ml' in navigator)) {
    message = 'ml in navigator: false<br/>';
  }
  try {
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    message = 'WebNN API is supported in this browser';
   } catch (error) {
    message += error.message + '<br/>';
    message += 'WebNN API is not supported in this browser';
  }
  message = '<h1>Hello WebNN</h1>' + message;
  document.getElementById("app").innerHTML = message;
  console.log(message);
}

webnn()`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}`}
    },
    "svelte": {
      '/App.svelte': {
        active: true,
        code: `<script>
  import { onMount } from 'svelte';
  import { webnn } from './webnn.js';

  let message = '';
  onMount(async () => {
    message = await webnn();
    console.log(message);
  });
</script>

<h1>Hello WebNN</h1>
<div>{message}</div>

<style>
  div {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #333;
  }
</style>`},
      '/webnn.js': {
        code: `export async function webnn() {
  let message;
  if (!('ml' in navigator)) {
    message = 'ml in navigator: false; ';
  }
  try {
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    message = 'WebNN API is supported in this browser';
  } catch (error) {
    message += error.message + '; ';
    message += 'WebNN API is not supported in this browser';
  }
  return message;
}`},
    },
  },
  "add-mul": {
    "title": "C = 0.2 * A + B",
    "description": "Compute the element-wise binary addition and multiplication of the two input tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Named constants for clarity and maintainability
const DEFAULT_SHAPE = [2, 2];
const SCALE_FACTOR = 0.2;
const INPUT_A_VALUE = 1.0;
const INPUT_B_VALUE = 0.8;

// Main WebNN function with configurable parameters
async function webnn({
  shape = DEFAULT_SHAPE,
  scale = SCALE_FACTOR,
  aValues = INPUT_A_VALUE,
  bValues = INPUT_B_VALUE,
} = {}) {
  // Check for WebNN API support
  if (!navigator.ml) {
    throw new Error("WebNN API is not supported");
  }

  // Define tensor descriptor
  const descriptor = { dataType: "float32", shape };
  const context = await navigator.ml.createContext();
  const builder = new MLGraphBuilder(context);

  // 1. Create a computational graph: C = scale * A + B
  const constant = builder.constant(descriptor, new Float32Array(shape[0] * shape[1]).fill(scale)); // Scaling factor
  const A = builder.input("A", descriptor); // First input matrix
  const B = builder.input("B", descriptor); // Second input matrix
  const C = builder.add(builder.mul(A, constant), B); // C = scaled A + B

  // 2. Compile the graph
  const graph = await builder.build({ "C": C });

  // 3. Create reusable input and output tensors with error handling
  const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
    context.createTensor({ dataType: A.dataType, shape: A.shape, writable: true }).catch(err => {
      throw new Error("Failed to create inputTensorA: " + err.message);
    }),
    context.createTensor({ dataType: B.dataType, shape: B.shape, writable: true }).catch(err => {
      throw new Error("Failed to create inputTensorB: " + err.message);
    }),
    context.createTensor({ dataType: C.dataType, shape: C.shape, readable: true }).catch(err => {
      throw new Error("Failed to create outputTensorC: " + err.message);
    }),
  ]);

  // 4. Initialize the inputs efficiently
  context.writeTensor(inputTensorA, new Float32Array(shape[0] * shape[1]).fill(aValues));
  context.writeTensor(inputTensorB, new Float32Array(shape[0] * shape[1]).fill(bValues));

  // 5. Execute the graph
  const inputs = { "A": inputTensorA, "B": inputTensorB };
  const outputs = { "C": outputTensorC };
  context.dispatch(graph, inputs, outputs);

  // 6. Read back the computed result
  const result = await context.readTensor(outputTensorC);
  return { data: new Float32Array(result), shape }; // Return data and shape for formatting
}

// Utility function to format tensor output as a matrix
function formatTensorResult(array, shape) {
  const [rows, cols] = shape;
  let output = "<br/>";
  for (let i = 0; i < rows; i++) {
    output += array.slice(i * cols, (i + 1) * cols).join(" ") + "<br/>";
  }
  return output;
}

// Debounce utility to prevent rapid successive clicks
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Event listener with debouncing
document.querySelector("#run").addEventListener(
  "click",
  debounce(async () => {
    const output = document.querySelector("#output");
    output.textContent = "Inferencing...";
    try {
      const { data, shape } = await webnn(); // Use default values
      console.log(data);
      output.innerHTML = "Output value:" + formatTensorResult(data, shape);
    } catch (error) {
      console.log(error.message);
      output.textContent = "Error: " + error.message;
    }
  }, 300) // 300ms debounce
);`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
  <title>C = 0.2 * A + B</title>
</head>

<body>
  <h1>C = 0.2 * A + B</h1>
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
      '/index.js': {
        active: true,
        code: `import "./styles.css";

async function webnn() {
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
    const result = await webnn();
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
  <title>C = 0.2 * A + B</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
</head>

<body>
  <h1>C = 0.2 * A + B</h1>
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
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
        code: `export async function webnn() {
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
    console.log(result);
    return new Float32Array(result).toString();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}` },
      '/App.svelte': {
        code: `<script>
  import { webnn } from './webnn.js';
  let result = $state("");
  async function run() {
    try {
      result = "Computing...";
      result = await webnn();
    } catch (error) {
      result = 'Error: ' + error.message;
    }
  }
</script>

<main>
  <h1>C = 0.2 * A + B</h1>
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
        code: `export async function webnn() {
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
import { webnn } from './webnn.js';

export default function App() {
  const [result, setResult] = useState('Click "Run WebNN" to start');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlewebnn() {
    setLoading(true);
    setError(null);
    setResult("");

    try {
      const webNNResult = await webnn();
      setResult(webNNResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>C = 0.2 * A + B</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>

      <button style={styles.button} onClick={handlewebnn} disabled={loading}>
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
      '/src/webnn.js': { code: `` },
      '/src/App.vue': {
        active: true,
        code: `<template>
  <div>
      <h1>C = 0.2 * A + B</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>
    <button @click="webnn">Run WebNN</button>
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
    async webnn() {
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
        code: `// Create WebNN context
async function createWebNNContext() {
  if (!('ml' in navigator)) {
    throw new Error('WebNN API is not supported. Try enabling it in chrome://flags or using a compatible browser.');
  }
  try {
    return await navigator.ml.createContext({ deviceType: 'cpu' });
  } catch (e) {
    throw new Error('Failed to create WebNN context: ' + e.message);
  }
}

// Create input tensor
function createInputTensor(builder, shape, data) {
  return builder.input('input', { dataType: 'float32', shape });
}

// Create filter tensor
function createFilterTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Create bias tensor
function createBiasTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Execute Conv2D operation
async function runConv2d(context, builder, input, filter, options, inputData, outputShape) {
  const conv = builder.conv2d(input, filter, options);
  const graph = await builder.build({ 'output': conv });

  const inputTensor = await context.createTensor({
    dataType: 'float32',
    shape: input.shape,
    writable: true
  });
  await context.writeTensor(inputTensor, inputData);

  const outputTensor = await context.createTensor({
    dataType: 'float32',
    shape: outputShape,
    readable: true
  });

  const inputs = {
    'input': inputTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    const inputShape = [1, 1, 4, 4]; // [batches, inputChannels, height, width]
    // const inputData = new Float32Array(16).fill(1);
    const inputData = new Float32Array([
      1, 1, 1, 1, // First row
      1, 1, 1, 1, // Second row
      1, 1, 1, 1, // Third row
      1, 1, 1, 1  // Fourth row
    ]);
    const input = createInputTensor(builder, inputShape, inputData);

    const filterShape = [1, 1, 3, 3]; // [outputChannels, inputChannels/groups, height, width]
    // const filterData = new Float32Array(9).fill(1); // 3x3 of ones
    const filterData = new Float32Array([
      1, 1, 1, 
      1, 1, 1, 
      1, 1, 1
    ]);
    const filter = createFilterTensor(builder, filterShape, filterData);

    // An 1-D tensor with the shape of [outputChannels] whose values are to be added to the convolution result
    const biasShape = [1]; // 1 bias for 1 output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = createBiasTensor(builder, biasShape, biasData);

    const options = {
      inputLayout: 'nchw',  // [batch, channels, height, width]
      filterLayout: 'oihw', // [outputChannels, inputChannels, height, width]
      bias,
      padding: [1, 1, 1, 1], // [beginningHeight, endingHeight, beginningWidth, endingWidth]
      strides: [1, 1],       // [height, width]
      dilations: [1, 1],     // [height, width]
      groups: 1              // number of groups that input channels and output channels are divided into
    };

    const outputShape = [1, 1, 4, 4]; // [batches, outputChannels, height, width]
    const outputData = await runConv2d(context, builder, input, filter, options, inputData, outputShape);
    console.log('Input:', inputData);
    console.log('Output:', outputData);
    return {
      input: { shape: inputShape, data: Array.from(inputData) },
      options,
      filter: { shape: filterShape, data: Array.from(filterData) },
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}`},
      '/ui.js': { code:`function createOptionsTable(element, options) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const headers = ['Option', 'Value', 'Option', 'Value'];
  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const entries = Object.entries(options);
  const halfLength = Math.ceil(entries.length / 2);
  const leftColumn = entries.slice(0, halfLength);
  const rightColumn = entries.slice(halfLength);

  for (let i = 0; i < halfLength; i++) {
    const row = document.createElement('tr');

    const leftKeyCell = document.createElement('td');
    const leftValueCell = document.createElement('td');
    if (leftColumn[i]) {
      leftKeyCell.textContent = leftColumn[i][0];
      const value = leftColumn[i][1];
      if (value && value.dataType && value.shape) {
        leftValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        leftValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        leftValueCell.textContent = String(value);
      }
    }

    const rightKeyCell = document.createElement('td');
    const rightValueCell = document.createElement('td');
    if (rightColumn[i]) {
      rightKeyCell.textContent = rightColumn[i][0];
      const value = rightColumn[i][1];
      if (value && value.dataType && value.shape) {
        rightValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        rightValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        rightValueCell.textContent = String(value);
      }
    }

    row.appendChild(leftKeyCell);
    row.appendChild(leftValueCell);
    row.appendChild(rightKeyCell);
    row.appendChild(rightValueCell);
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  element.innerHTML = '';
  element.appendChild(table);
}

function displayResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  // Input grid
  const inputHeight = results.input.shape[2];
  const inputWidth = results.input.shape[3];
  let inputGrid = '';
  for (let i = 0; i < inputHeight; i++) {
    const row = results.input.data.slice(i * inputWidth, (i + 1) * inputWidth);
    inputGrid += row.join(' ') + '<br>';
  }

  // Filter grid
  const filterHeight = results.filter.shape[2];
  const filterWidth = results.filter.shape[3];
  let filterGrid = '';
  for (let i = 0; i < filterHeight; i++) {
    const row = results.filter.data.slice(i * filterWidth, (i + 1) * filterWidth);
    filterGrid += row.join(' ') + '<br>';
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(1));
    outputGrid += row.join(' ') + '<br>';
  }

  resultDiv.innerHTML = 
    '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input (' + inputHeight + 'x' + inputWidth + ')</h4>' +
        '<div class="grid">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Filter (' + filterHeight + 'x' + filterWidth + ')</h4>' +
        '<div class="grid">' + filterGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output (' + outputHeight + 'x' + outputWidth + ')</h4>' +
        '<div class="grid">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running Conv2D with WebNN...';
  }
  
  try {
    const results = await run();
    if (results) {
      if (statusDiv) {
        createOptionsTable(statusDiv, results.options);
      }
      displayResults(results);
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
}

document.addEventListener('DOMContentLoaded', initialize, false);` },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebNN Conv2d</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <h1>WebNN Conv2D</h1>
    <div id="status"></div>
    <div id="result"></div>
    <script src="./webnn.js"></script>
    <script src="./ui.js"></script>
  </body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
}
table {
  border-collapse: collapse;
  margin: 0.5rem 0;
}
th, td {
  border: 1px solid #eee;
  padding: 0.2rem 0.5rem;
  text-align: center;
}
th {
  background-color: #fafafa;
}
.grid-container {
  display: flex;
  justify-content: start;
  margin: 0;
  gap: 2rem;
}
.grid-item {
  text-align: center;
}
.grid-item h4 {
  margin: 0.5rem 0;
}
.grid {
  font-family: monospace;
  font-size: 0.9rem;
  padding: 10px;
  border: 1px solid #ccc;
}`}
    },
  },
  "convTranspose2d": {
    "title": "convTranspose2d",
    "description": "Compute a 2-D transposed convolution given 4-D input and filter tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
async function createWebNNContext() {
  if (!('ml' in navigator)) {
    throw new Error('WebNN API is not supported. Try enabling it in chrome://flags or using a compatible browser.');
  }
  try {
    return await navigator.ml.createContext({ deviceType: 'cpu' });
  } catch (e) {
    throw new Error('Failed to create WebNN context: ' + e.message);
  }
}

// Create input tensor
function createInputTensor(builder, shape) {
  return builder.input('input', { dataType: 'float32', shape });
}

// Create filter tensor
function createFilterTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Create bias tensor
function createBiasTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Execute ConvTranspose2D operation
async function runConvTranspose2d(context, builder, input, filter, options, inputData, outputShape) {
  const convTranspose = builder.convTranspose2d(input, filter, options);
  const graph = await builder.build({ 'output': convTranspose });

  const inputTensor = await context.createTensor({
    dataType: 'float32',
    shape: input.shape,
    writable: true
  });
  await context.writeTensor(inputTensor, inputData);

  const outputTensor = await context.createTensor({
    dataType: 'float32',
    shape: outputShape,
    readable: true
  });

  const inputs = {
    'input': inputTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    // For ConvTranspose2d, the input is typically smaller than the output
    const inputShape = [1, 1, 2, 2]; // [batches, inputChannels, height, width]
    const inputData = new Float32Array([
      1, 2, // First row
      3, 4  // Second row
    ]);
    const input = createInputTensor(builder, inputShape);

    // For ConvTranspose2d, the filter is flipped compared to Conv2d
    const filterShape = [1, 1, 3, 3]; // [inputChannels, outputChannels/groups, height, width]
    const filterData = new Float32Array([
      1, 1, 1, 
      1, 1, 1, 
      1, 1, 1
    ]);
    const filter = createFilterTensor(builder, filterShape, filterData);

    // Bias is similar to Conv2d
    const biasShape = [1]; // 1 bias for 1 output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = createBiasTensor(builder, biasShape, biasData);

    const options = {
      inputLayout: 'nchw',    // [batch, channels, height, width]
      filterLayout: 'iohw',   // [inputChannels, outputChannels, height, width] - note the change from 'oihw'
      bias,
      padding: [0, 0, 0, 0],  // [beginningHeight, endingHeight, beginningWidth, endingWidth]
      strides: [3, 3],        // [height, width] - using stride 2 for upsampling
      outputPadding: [0, 0],  // Additional padding for output
      dilations: [1, 1],      // [height, width]
      groups: 1               // number of groups that input channels and output channels are divided into
    };

    // The output shape will be larger due to the upsampling nature of ConvTranspose2d
    const outputShape = [1, 1, 6, 6]; // [batches, outputChannels, height, width]
    const outputData = await runConvTranspose2d(context, builder, input, filter, options, inputData, outputShape);
    return {
      input: { shape: inputShape, data: Array.from(inputData) },
      options,
      filter: { shape: filterShape, data: Array.from(filterData) },
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}

function createOptionsTable(element, options) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const headers = ['Option', 'Value', 'Option', 'Value'];
  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const entries = Object.entries(options);
  const halfLength = Math.ceil(entries.length / 2);
  const leftColumn = entries.slice(0, halfLength);
  const rightColumn = entries.slice(halfLength);

  for (let i = 0; i < halfLength; i++) {
    const row = document.createElement('tr');

    const leftKeyCell = document.createElement('td');
    const leftValueCell = document.createElement('td');
    if (leftColumn[i]) {
      leftKeyCell.textContent = leftColumn[i][0];
      const value = leftColumn[i][1];
      if (value && value.dataType && value.shape) {
        leftValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        leftValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        leftValueCell.textContent = String(value);
      }
    }

    const rightKeyCell = document.createElement('td');
    const rightValueCell = document.createElement('td');
    if (rightColumn[i]) {
      rightKeyCell.textContent = rightColumn[i][0];
      const value = rightColumn[i][1];
      if (value && value.dataType && value.shape) {
        rightValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        rightValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        rightValueCell.textContent = String(value);
      }
    }

    row.appendChild(leftKeyCell);
    row.appendChild(leftValueCell);
    row.appendChild(rightKeyCell);
    row.appendChild(rightValueCell);
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  element.innerHTML = '';
  element.appendChild(table);
}

function displayResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  // Input grid
  const inputHeight = results.input.shape[2];
  const inputWidth = results.input.shape[3];
  let inputGrid = '';
  for (let i = 0; i < inputHeight; i++) {
    const row = results.input.data.slice(i * inputWidth, (i + 1) * inputWidth);
    inputGrid += row.join(' ') + '<br>';
  }

  // Filter grid
  const filterHeight = results.filter.shape[2];
  const filterWidth = results.filter.shape[3];
  let filterGrid = '';
  for (let i = 0; i < filterHeight; i++) {
    const row = results.filter.data.slice(i * filterWidth, (i + 1) * filterWidth);
    filterGrid += row.join(' ') + '<br>';
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(1));
    outputGrid += row.join(' ') + '<br>';
  }

  resultDiv.innerHTML = 
    '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input (' + inputHeight + 'x' + inputWidth + ')</h4>' +
        '<div class="grid">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Filter (' + filterHeight + ' x ' + filterWidth + ')</h4>' +
        '<div class="grid">' + filterGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output (' + outputHeight + ' x ' + outputWidth + ')</h4>' +
        '<div class="grid">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (!statusDiv) {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    document.body.appendChild(statusDiv);
  }
  
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.body.appendChild(resultDiv);
  }

  if (statusDiv) {
    statusDiv.textContent = 'Running ConvTranspose2D with WebNN...';
  }
  
  try {
    const results = await run();
    if (results) {
      if (statusDiv) {
        createOptionsTable(statusDiv, results.options);
      }
      displayResults(results);
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
}

document.addEventListener('DOMContentLoaded', initialize, false);`},
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebNN convTranspose2d</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <h1>WebNN convTranspose2d</h1>
    <div id="status"></div>
    <div id="result"></div>
    <script src="./webnn.js"></script>
  </body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
}
table {
  border-collapse: collapse;
  margin: 0.5rem 0;
}
th, td {
  border: 1px solid #eee;
  padding: 0.2rem 0.5rem;
  text-align: center;
}
th {
  background-color: #fafafa;
}
.grid-container {
  display: flex;
  justify-content: start;
  margin: 0;
  gap: 2rem;
}
.grid-item {
  text-align: center;
}
.grid-item h4 {
  margin: 0.5rem 0;
}
.grid {
  font-family: monospace;
  font-size: 0.9rem;
  padding: 10px;
  border: 1px solid #ccc;
}`}
    },
  },
}