
export const transformersjsEditorFiles = {
  "image-classification-mobilenet-v2": {
    "title": "Image Classification (MobileNet v2)",
    "description": "An image classification demo using WebNN and Transformers.js based on ONNX Runtime Web",
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
  },
  "object-detection-yolos": {
    "title": "Object Detection (Yolos)",
    "description": "An Object Detection demo using WebNN and Transformers.js based on ONNX Runtime Web",
    "static": {
      '/index.html': {
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebNN / Transformers.js | Real-time Object Detection</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    WebNN / Transformers.js | Real-time Object Detection / Yolo
    <div class="container">
      <video id="video" playsinline></video>
      <canvas id="canvas"></canvas>
      <div id="overlay"></div>
    </div>
    
    <div class="controls">
      <div>
        <label for="confidence">Confidence Threshold: <span id="confidence-value">0.25</span></label>
        <input type="range" min="0.1" max="0.9" step="0.05" value="0.25" id="confidence">
      </div>
      <div>
        <label>Select Model:</label>
        <input type="radio" id="yolo11n" name="model" value="webnn/yolo11n">
        <label for="yolo11n">YOLO11n</label>
        <input type="radio" id="yolov8n" name="model" value="webnn/yolov8n" checked>
        <label for="yolov8n">YOLOv8n</label>
        <input type="radio" id="yolov8m" name="model" value="webnn/yolov8m">
        <label for="yolov8m">YOLOv8m</label>
      </div>
      <div>
        <button id="start-button">Start Detection</button>
        <button id="stop-button" disabled>Stop Detection</button>
      </div>
    </div>
    
    <div class="status-bar">
      <div id="status">Loading...</div>
      <div id="fps">FPS: 0</div>
    </div>
    <div>
      session_options: { logSeverityLevel: 0 }<br/>
      env.backends.onnx.logSeverityLevel = 0; <br/>
      <a href="?provider=webgpu">WebGPU</a> | <a href="?provider=webnn-gpu">WebNN GPU</a> | <a href="?provider=webnn-npu">WebNN NPU</a>
    </div>
    <div id="log"></div>

    <script type="module" src="./webnn.js"></script>
    <script src="./ui.js"></script>
  </body>
</html>
`},
      '/webnn.js': {
        active: true,
        code: `import { AutoModel, AutoProcessor, RawImage, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

// Reduce log noise from ONNX Runtime
env.backends.onnx.logSeverityLevel = 0;

// DOM elements
const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const overlayElement = document.getElementById("overlay");
const statusElement = document.getElementById("status");
const fpsElement = document.getElementById("fps");
const confidenceSlider = document.getElementById("confidence");
const confidenceValue = document.getElementById("confidence-value");

// Configuration
let MODEL_ID = "webnn/yolov8n"; // Default model
let confidenceThreshold = 0.25;
let isProcessing = false;
let lastFrameTime = 0;
let detectionLoopId = null; // Store the requestAnimationFrame ID
let stream = null; // Store the camera stream

// Add event listeners for model selection
const modelRadios = document.getElementsByName("model");
modelRadios.forEach(radio => {
  radio.addEventListener("change", async () => {
    // Stop the current detection process
    stopDetection();

    // Update the model ID
    MODEL_ID = radio.value;
    console.log('Model switched to: ' + MODEL_ID);
    statusElement.textContent = 'Model switched to: ' + MODEL_ID;

    // Start the detection with the new model
    await startDetection();
  });
});

// Initialize sliders
confidenceSlider.value = confidenceThreshold;
confidenceValue.textContent = confidenceThreshold;
confidenceSlider.addEventListener("input", () => {
  confidenceThreshold = parseFloat(confidenceSlider.value);
  confidenceValue.textContent = confidenceThreshold.toFixed(2);
});

// Colors for bounding boxes
const COLORS = [
  "#FF3838", "#FF9D97", "#FF701F", "#FFB21D", "#CFD231", 
  "#48F90A", "#92CC17", "#3DDB86", "#1A9334", "#00D4BB", 
  "#2C99A8", "#00C2FF", "#344593", "#6473FF", "#0018EC", 
  "#8438FF", "#520085", "#CB38FF", "#FF95C8", "#FF37C7"
];

async function initializeModel() {
  statusElement.textContent = "Loading model...";
  
  try {
    // Detect best available backend
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get('provider') || 'webgpu';
    
    console.log('Using ' + provider + ' backend with fp16 precision');
    
    // Load model and processor
    const model = await AutoModel.from_pretrained(MODEL_ID, {
      device: provider.toLowerCase(),
      dtype: "fp16",
      session_options: {
        logSeverityLevel: 0
      }
    });
    
    const processor = await AutoProcessor.from_pretrained(MODEL_ID);
    
    // Configure processor to match model's expected input size (640x640)
    processor.feature_extractor.size = { width: 640, height: 640 };
    
    // Log the class names from the model config
    console.log("Model config:", model.config);
    console.log("Class labels:", model.config.id2label);
    
    statusElement.textContent = "Model loaded! Starting camera...";
    return { model, processor };
  } catch (error) {
    statusElement.textContent = 'Error loading model: ' + error.message;
    console.error("Model initialization error:", error);
    throw error;
  }
}

function setupCamera() {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    .then(stream => {
      videoElement.srcObject = stream;
      
      videoElement.onloadedmetadata = () => {
        // Set canvas size to 720px width and proportional height
        const aspectRatio = videoElement.videoHeight / videoElement.videoWidth;
        canvasElement.width = 720;
        canvasElement.height = 720 * aspectRatio;
        overlayElement.style.width = canvasElement.width + 'px';
        // overlayElement.style.height = canvasElement.height + 'px';
        
        // Start video playback
        videoElement.play();
        resolve(stream);
      };
    })
    .catch(error => {
      statusElement.textContent = 'Camera error: '+ error.message;
      reject(error);
    });
  });
}

function processDetections(outputs, imageWidth, imageHeight, classLabels) {

  // Process YOLOv8 outputs (shape: [1, 84, 8400])
  // For each of the 8400 predictions, we have 84 values:
  // - First 4 are bounding box coordinates (x, y, width, height)
  // - Remaining 80 are class confidences for COCO dataset

  // Clear previous detections
  overlayElement.innerHTML = "";

  const scaleX = canvasElement.width / 640; // Scale factor for width
  const scaleY = canvasElement.height / 640; // Scale factor for height

  const predictions = outputs.tolist()[0]; // Get the first batch
  const numClasses = predictions.length - 4; // Subtract 4 for bbox coordinates
  const numPredictions = predictions[0].length; // Number of predictions (8400)

  let detections = [];

  // Process each prediction
  for (let i = 0; i < numPredictions; i++) {
    const x = predictions[0][i];
    const y = predictions[1][i];
    const w = predictions[2][i];
    const h = predictions[3][i];

    let maxScore = 0;
    let maxClassIndex = -1;

    for (let c = 0; c < numClasses; c++) {
      const score = predictions[c + 4][i];
      if (score > maxScore) {
        maxScore = score;
        maxClassIndex = c;
      }
    }

    if (maxScore < confidenceThreshold) continue;

    const xmin = (x - w / 2) * scaleX;
    const ymin = (y - h / 2) * scaleY;
    const width = w * scaleX;
    const height = h * scaleY;

    detections.push({
      bbox: [xmin, ymin, width, height],
      score: maxScore,
      class: maxClassIndex,
    });
  }

  // Apply Non-Maximum Suppression (NMS)
  detections = applyNMS(detections, 0.5); // 0.5 is the IoU threshold

  // Render filtered detections
  detections.forEach((detection) => {
    const [x, y, width, height] = detection.bbox;
    const className = classLabels[detection.class];
    const color = COLORS[detection.class % COLORS.length];
    const score = detection.score;

    const boxElement = document.createElement("div");
    boxElement.className = "detection-box";
    boxElement.style.left = x + 'px';
    boxElement.style.top = y + 'px';
    boxElement.style.width =  width + 'px';
    boxElement.style.height =  height + 'px';
    boxElement.style.borderColor = color;

    const labelElement = document.createElement("div");
    labelElement.className = "detection-label";
    labelElement.style.backgroundColor = color;
    labelElement.textContent = 'className ' + (score * 100).toFixed(1) + '%';

    boxElement.appendChild(labelElement);
    overlayElement.appendChild(boxElement);
  });

  return detections.length;
}

function applyNMS(detections, iouThreshold) {
  // Sort detections by confidence score in descending order
  detections.sort((a, b) => b.score - a.score);

  const filteredDetections = [];
  const used = new Array(detections.length).fill(false);

  for (let i = 0; i < detections.length; i++) {
    if (used[i]) continue;

    const detectionA = detections[i];
    filteredDetections.push(detectionA);

    for (let j = i + 1; j < detections.length; j++) {
      if (used[j]) continue;

      const detectionB = detections[j];
      const iou = calculateIoU(detectionA.bbox, detectionB.bbox);

      if (iou > iouThreshold) {
        used[j] = true; // Suppress overlapping box
      }
    }
  }

  return filteredDetections;
}

function calculateIoU(boxA, boxB) {
  const [xA, yA, wA, hA] = boxA;
  const [xB, yB, wB, hB] = boxB;

  const x1 = Math.max(xA, xB);
  const y1 = Math.max(yA, yB);
  const x2 = Math.min(xA + wA, xB + wB);
  const y2 = Math.min(yA + wA, yB + hB);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const areaA = wA * hA;
  const areaB = wB * hB;

  const union = areaA + areaB - intersection;
  return intersection / union;
}

async function detectFrame(model, processor, ctx) {
  if (isProcessing) return;
  isProcessing = true;
  
  try {
    const startTime = performance.now();
    
    // Capture current frame from video
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    
    // Convert to RawImage format for transformers.js
    const image = new RawImage(imageData.data, canvasElement.width, canvasElement.height, 4);
    
    // Process image and run model
    const inputs = await processor(image);
    const { outputs } = await model(inputs);
    
    // Extract class labels from model config
    const classLabels = {};
    for (const [id, label] of Object.entries(model.config.id2label)) {
      classLabels[id] = label;
    }
    
    // Process and display detections
    const detectionCount = processDetections(outputs, canvasElement.width, canvasElement.height, classLabels);
    
    // Calculate FPS
    const endTime = performance.now();
    const frameTime = endTime - startTime;
    const fps = 1000 / (endTime - lastFrameTime);
    lastFrameTime = endTime;
    
    // Update status
    statusElement.textContent = 'Detected: ' + detectionCount + 'objects';
    fpsElement.textContent = 'FPS: '+ fps.toFixed(1) + ' | Processing: ' + frameTime.toFixed(0) + 'ms';
  } catch (error) {
    console.error("Detection error:", error);
    statusElement.textContent = 'Error: ' + error.message;
  } finally {
    isProcessing = false;
  }
}

async function startDetection() {
  try {
    // Initialize model and camera
    const { model, processor } = await initializeModel();
    stream = await setupCamera();

    // Get the canvas context with willReadFrequently set to true
    const ctx = canvasElement.getContext("2d", { willReadFrequently: true });

    // Main detection loop
    function detectionLoop() {
      detectFrame(model, processor, ctx).finally(() => {
        detectionLoopId = requestAnimationFrame(detectionLoop);
      });
    }

    // Start detection loop
    detectionLoop();
  } catch (error) {
    console.error("Application error:", error);
    statusElement.textContent = 'Failed to start:' + error.message;
  }
}

function stopDetection() {
  if (detectionLoopId) {
    cancelAnimationFrame(detectionLoopId);
    detectionLoopId = null;
  }

  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    stream = null;
  }

  videoElement.srcObject = null;
  isProcessing = false; // Ensure no further frames are processed
  statusElement.textContent = "Detection stopped.";
  fpsElement.textContent = "FPS: 0";
}

// Add event listeners for start and stop buttons
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  await startDetection();
});

stopButton.addEventListener("click", () => {
  stopDetection();
  startButton.disabled = false;
  stopButton.disabled = true;
});`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0 10px;
  font-size: 0.8rem;
}

.container {
  position: relative;
  margin: 0 auto;
  max-width: 100%;
}

#video {
  display: none;
}

#canvas {
  display: block;
  height: auto;
}

#overlay {
  pointer-events: none;
}

.detection-box {
  position: absolute;
  border: 2px solid;
  box-sizing: border-box;
}

.detection-label {
  position: absolute;
  top: -25px;
  left: -1px;
  padding: 2px 6px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.controls {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}`},
    },
 
  }
}