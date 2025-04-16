
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
    <title>WebNN / Transformers.js</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <h2>Image Classification - WebNN / Transformers.js</h2>     
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
        code: `import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

// Default remoteHost is https://huggingface.co
// Comment the following line if you are not in China
env.remoteHost = 'https://hf-mirror.com'; // PRC users only, set remote host to mirror site of huggingface for model loading 

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
      '/index.html': { code: `` },
      '/index.js': {
        active: true,
        code: `document.getElementById("app").innerHTML = '// Transformers.js + Vanilla JavaScript';
`},
      '/styles.css': { code: `` },
    },
    "svelte": {
      '/webnn.js': { code: `` },
      '/App.svelte': {
        active: true,
        code: `<script>
  let name = '// Transformers.js + Svelte';
</script>

<main>
  {name}
</main>`},
      '/styles.css': { code: `` },
    },
    "react": {
      '/webnn.js': { code: `` },
      '/App.js': {
        active: true,
        code: `export default function App() {
  return <div>// Transformers.js + React</div>
}`},
    },
    "vue": {
      '/src/webnn.js': { code: `` },
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
    <title>WebNN / Transformers.js - Object Detection</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <h1>WebNN / Transformers.js - Object Detection</h1>
    <div class="container">
      <video id="video" playsinline></video>
      <canvas id="canvas"></canvas>
      <div id="overlay"></div>
    </div>
    <div id="status"></div>
    <div class="controls">
      <div>
        <label for="confidence">Confidence Threshold: <span id="confidence-value">0.25</span></label>
        <input type="range" min="0.1" max="0.9" step="0.05" value="0.25" id="confidence">
      </div>
      <div>
        <input type="radio" id="yolo12n" name="model" value="webnn/yolo12n">
        <label for="yolo12n">YOLO12n</label>
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
    <div id="log"></div>
    <script type="module" src="./webnn.js"></script>
  </body>
</html>
`},
      '/webnn.js': {
        active: true,
        code: `import { AutoModel, AutoProcessor, RawImage, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

// Default remoteHost is https://huggingface.co
// Comment the following line if you are not in China
env.remoteHost = 'https://hf-mirror.com'; // PRC users only, set remote host to mirror site of huggingface for model loading 

// DOM Elements
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const overlayElement = document.getElementById('overlay');
const statusElement = document.getElementById('status');
const confidenceSlider = document.getElementById('confidence');
const confidenceValue = document.getElementById('confidence-value');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

// Configuration
const CONFIG = {
  DEFAULT_MODEL: 'webnn/yolov8n',
  CONFIDENCE_THRESHOLD: 0.25,
  NMS_IOU_THRESHOLD: 0.5,
  CANVAS_WIDTH: 480,
  YOLO_INPUT_SIZE: 640
};

// Detection state
const state = {
  modelId: CONFIG.DEFAULT_MODEL,
  confidenceThreshold: CONFIG.CONFIDENCE_THRESHOLD,
  isProcessing: false,
  lastFrameTime: 0,
  detectionLoopId: null,
  cameraStream: null,
  model: null,
  processor: null
};

// Colors for bounding boxes - using vibrant, distinct colors
const DETECTION_COLORS = [
  '#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231', 
  '#48F90A', '#92CC17', '#3DDB86', '#1A9334', '#00D4BB', 
  '#2C99A8', '#00C2FF', '#344593', '#6473FF', '#0018EC', 
  '#8438FF', '#520085', '#CB38FF', '#FF95C8', '#FF37C7'
];

// Initialize UI elements
function initializeUI() {
  // Set initial confidence slider value
  confidenceSlider.value = state.confidenceThreshold;
  confidenceValue.textContent = state.confidenceThreshold;
  
  // Add event listeners for confidence slider
  confidenceSlider.addEventListener('input', () => {
    state.confidenceThreshold = parseFloat(confidenceSlider.value);
    confidenceValue.textContent = state.confidenceThreshold.toFixed(2);
  });
  
  // Add event listeners for model selection
  const modelRadios = document.getElementsByName('model');
  modelRadios.forEach(radio => {
    radio.addEventListener('change', async () => {
      await switchModel(radio.value);
    });
  });
  
  // Add event listeners for start and stop buttons
  startButton.addEventListener('click', handleStartDetection);
  stopButton.addEventListener('click', handleStopDetection);
}

// Handle model switching
async function switchModel(newModelId) {
  stopDetection();
  state.modelId = newModelId;
  updateStatus('Model switched to: ' + newModelId);
  console.log('Model switched to: ' + newModelId);
  await startDetection();
}

// Load and initialize the model
async function initializeModel() {
  try {
    updateStatus('Loading model: ' + state.modelId + '...');
    console.log('Using webnn-gpu backend with fp16 precision');
    
    // Load model and processor
    const model = await AutoModel.from_pretrained(state.modelId, {
      device: 'webnn-gpu',
      dtype: 'fp16',
      session_options: {
        logSeverityLevel: 0
      }
    });
    
    const processor = await AutoProcessor.from_pretrained(state.modelId);
    
    // Configure processor for YOLO's expected input size
    processor.feature_extractor.size = { 
      width: CONFIG.YOLO_INPUT_SIZE, 
      height: CONFIG.YOLO_INPUT_SIZE 
    };
    
    // Log model configuration for debugging
    console.log('Model config:', model.config);
    
    // Store in state for reuse
    state.model = model;
    state.processor = processor;
    
    updateStatus('Model loaded successfully. Starting camera...');
    return { model, processor };
  } catch (error) {
    updateStatus('Error loading model: ' + error.message);
    console.error('Model initialization error:', error);
    throw error;
  }
}

// Initialize camera
function setupCamera() {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    .then(stream => {
      videoElement.srcObject = stream;
      state.cameraStream = stream;
      
      videoElement.onloadedmetadata = () => {
        // Calculate aspect ratio and set canvas dimensions
        const aspectRatio = videoElement.videoHeight / videoElement.videoWidth;
        canvasElement.width = CONFIG.CANVAS_WIDTH;
        canvasElement.height = CONFIG.CANVAS_WIDTH * aspectRatio;
        
        // Set overlay to match canvas size
        overlayElement.style.width = canvasElement.width + 'px';
        
        // Start video playback
        videoElement.play()
          .then(() => resolve(stream))
          .catch(error => {
            updateStatus('Video playback error: ' + error.message);
            reject(error);
          });
      };
    })
    .catch(error => {
      updateStatus('Camera access error: ' + error.message);
      reject(error);
    });
  });
}

// Process YOLOv8 detections
function processDetections(outputs, classLabels) {
  // Clear previous detections
  overlayElement.innerHTML = '';

  const scaleX = canvasElement.width / CONFIG.YOLO_INPUT_SIZE;
  const scaleY = canvasElement.height / CONFIG.YOLO_INPUT_SIZE;

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

    // Find class with highest confidence
    let maxScore = 0;
    let maxClassIndex = -1;

    for (let c = 0; c < numClasses; c++) {
      const score = predictions[c + 4][i];
      if (score > maxScore) {
        maxScore = score;
        maxClassIndex = c;
      }
    }

    // Filter by confidence threshold
    if (maxScore < state.confidenceThreshold) continue;

    // Convert to canvas coordinates
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
  detections = applyNMS(detections, CONFIG.NMS_IOU_THRESHOLD);

  // Render filtered detections
  renderDetections(detections, classLabels);

  return detections.length;
}

// Render detection boxes and labels on overlay
function renderDetections(detections, classLabels) {
  detections.forEach(detection => {
    const [x, y, width, height] = detection.bbox;
    const className = classLabels[detection.class];
    const color = DETECTION_COLORS[detection.class % DETECTION_COLORS.length];
    const score = detection.score;

    // Create box element
    const boxElement = document.createElement('div');
    boxElement.className = 'detection-box';
    boxElement.style.left = x + 'px';
    boxElement.style.top = y + 'px';
    boxElement.style.width = width + 'px';
    boxElement.style.height = height + 'px';
    boxElement.style.borderColor = color;

    // Create label element
    const labelElement = document.createElement('div');
    labelElement.className = 'detection-label';
    labelElement.style.backgroundColor = color;
    labelElement.textContent = className + ' ' + (score * 100).toFixed(1) + '%';

    boxElement.appendChild(labelElement);
    overlayElement.appendChild(boxElement);
  });
}

// Apply Non-Maximum Suppression to filter overlapping boxes
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

// Calculate Intersection over Union for two bounding boxes
function calculateIoU(boxA, boxB) {
  const [xA, yA, wA, hA] = boxA;
  const [xB, yB, wB, hB] = boxB;

  // Calculate coordinates of intersection rectangle
  const x1 = Math.max(xA, xB);
  const y1 = Math.max(yA, yB);
  const x2 = Math.min(xA + wA, xB + wB);
  const y2 = Math.min(yA + hA, yB + hB);

  // Calculate area of intersection
  const intersectionWidth = Math.max(0, x2 - x1);
  const intersectionHeight = Math.max(0, y2 - y1);
  const intersection = intersectionWidth * intersectionHeight;
  
  // Calculate areas of both bounding boxes
  const areaA = wA * hA;
  const areaB = wB * hB;

  // Calculate IoU
  const union = areaA + areaB - intersection;
  return intersection / union;
}

// Process a single video frame
async function processFrame(ctx) {
  if (state.isProcessing) return;
  state.isProcessing = true;
  
  try {
    const startTime = performance.now();
    
    // Capture current frame from video
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    
    // Convert to RawImage format for transformers.js
    const image = new RawImage(imageData.data, canvasElement.width, canvasElement.height, 4);
    
    // Process image with the model
    const inputs = await state.processor(image);
    const { outputs } = await state.model(inputs);
    
    // Extract class labels from model config
    const classLabels = {};
    for (const [id, label] of Object.entries(state.model.config.id2label)) {
      classLabels[id] = label;
    }
    
    // Process and display detections
    const detectionCount = processDetections(outputs, classLabels);
    
    // Calculate performance metrics
    const endTime = performance.now();
    const frameTime = endTime - startTime;
    const fps = 1000 / (endTime - state.lastFrameTime);
    state.lastFrameTime = endTime;
    
    // Update status display
    updateStatus(
      'Detected ' + detectionCount + ' objects · ' + 
      fps.toFixed(1) + ' FPS · ' + 
      frameTime.toFixed(0) + 'ms processing'
    );
  } catch (error) {
    console.error('Detection error:', error);
    updateStatus('Error: ' + error.message);
  } finally {
    state.isProcessing = false;
  }
}

// Main detection loop
function startDetectionLoop(ctx) {
  function detectionLoop() {
    processFrame(ctx).finally(() => {
      state.detectionLoopId = requestAnimationFrame(detectionLoop);
    });
  }
  
  detectionLoop();
}

// Start detection process
async function startDetection() {
  try {
    // Initialize model if not already loaded
    if (!state.model || !state.processor) {
      await initializeModel();
    }
    
    // Setup camera
    await setupCamera();

    // Get the canvas context with willReadFrequently set to true for better performance
    const ctx = canvasElement.getContext('2d', { willReadFrequently: true });

    // Start detection loop
    startDetectionLoop(ctx);
    
    return true;
  } catch (error) {
    console.error('Application error:', error);
    updateStatus('Failed to start: ' + error.message);
    return false;
  }
}

// Stop detection process
function stopDetection() {
  // Cancel animation frame
  if (state.detectionLoopId) {
    cancelAnimationFrame(state.detectionLoopId);
    state.detectionLoopId = null;
  }

  // Stop camera stream
  if (state.cameraStream) {
    const tracks = state.cameraStream.getTracks();
    tracks.forEach(track => track.stop());
    state.cameraStream = null;
  }

  // Clear video source
  videoElement.srcObject = null;
  
  // Reset state
  state.isProcessing = false;
  
  updateStatus('Detection stopped');
}

// Handle start button click
async function handleStartDetection() {
  startButton.disabled = true;
  stopButton.disabled = false;
  const success = await startDetection();
  
  // Revert button state if startup failed
  if (!success) {
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

// Handle stop button click
function handleStopDetection() {
  stopDetection();
  startButton.disabled = false;
  stopButton.disabled = true;
}

// Update status display
function updateStatus(message) {
  statusElement.textContent = message;
  console.log('Status:', message);
}

// Initialize the application
initializeUI();`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0 10px;
  font-size: 0.8rem;
}

h1 { margin: 10px 0; }

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

#status {
  display: flex;
  justify-content: start;
  margin: 5px 0;
}`},
    },

  },
  "translation": {
    "title": "Translation (WIP)",
    "description": "An multiple languages translation demo using WebNN and Transformers.js based on ONNX Runtime Web",
    "static": {
      '/index.html': {
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebNN / Transformers.js - Translation</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <h1>WebNN / Transformers.js - Translation</h1>
    <div id="content"> 
      <div id="src" contenteditable="true">
	      宇宙，最后的边疆。这是星舰进取号的航程。它的五年任务，是去探索这未知的新世界，找寻新的生命与新文明，勇踏前人未至之境。
      </div>
      <div id="tgt"></div>
    </div> 
    <div class="controls">
      <button id="start">Translate</button>
    </div>
    <div id="log"></div>
    <script type="module" src="./webnn.js"></script>
  </body>
</html>
`},
      '/webnn.js': {
        active: true,
        code: `import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.1';

// Default remoteHost is https://huggingface.co
// Comment the following line if you are not in China
env.remoteHost = 'https://hf-mirror.com'; // PRC users only, set remote host to mirror site of huggingface for model loading 

async function translate() {
  const options = {
    dtype: 'fp32',
    device: 'webgpu', // 'webnn-gpu' and 'webnn-npu'
    session_options: {
      // https://ibelem.github.io/netron/?url=https://huggingface.co/Xenova/opus-mt-mul-en/resolve/main/onnx/encoder_model.onnx
      // https://ibelem.github.io/netron/?url=https://huggingface.co/Xenova/opus-mt-mul-en/resolve/main/onnx/decoder_model_merged.onnx
      // freeDimensionOverrides: {
      //   batch_size:
      //   encoder_sequence_length:
      //   decoder_sequence_length:
      //   past_decoder_sequence_length:
      //   encoder_sequence_length_out: 
      // },
      logSeverityLevel: 0
   }
  }

  try {
    const translator = await pipeline('translation', 'Xenova/opus-mt-mul-en', options);
    const srcContent = document.querySelector('#src').textContent;

    const output = await translator(srcContent, {
      src_lang: 'zh', // Chinese
      tgt_lang: 'en', // English
    });
    console.log(output);
    document.querySelector('#tgt').textContent = output[0].translation_text;
  } catch (error) {
    throw new Error(error.message);
  }
}

document.querySelector('#start').addEventListener('click', translate, false);
`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0 10px;
  font-size: 0.8rem;
}

h1 { margin: 10px 0; }

#content {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 10px;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

#content div {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 3px;
  min-height: 60px;
  outline: none;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 3px;
  border: 1px solid #eee;
  background-color: #f3f3f3;
  cursor: pointer;
}

button:hover {
  background-color: #eee;
}`},
    },
  }
}