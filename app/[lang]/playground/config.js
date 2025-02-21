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
      'index.js': { code: `// WebNN API + Svelte` },
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
      'index.js': { code: `// WebNN API + React` },
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
      'index.js': { code: `// WebNN API + Vue` }
    },
    "ort": {
      'index.js': { code: `// ONNX Runtime Web + Vue` },
    },
    "transformersjs" : {
      'index.js': { code: `// Transformers.js + Vue` },
    }
  },
}