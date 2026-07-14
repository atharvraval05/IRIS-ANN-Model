// DOM Elements
const slideSepalLength = document.getElementById('slide-sepal-length');
const slideSepalWidth = document.getElementById('slide-sepal-width');
const slidePetalLength = document.getElementById('slide-petal-length');
const slidePetalWidth = document.getElementById('slide-petal-width');

const labelSepalLength = document.getElementById('label-sepal-length');
const labelSepalWidth = document.getElementById('label-sepal-width');
const labelPetalLength = document.getElementById('label-petal-length');
const labelPetalWidth = document.getElementById('label-petal-width');

const predictionName = document.getElementById('predictionName');
const predictionScientific = document.getElementById('predictionScientific');
const predictionSummary = document.getElementById('predictionSummary');
const confidenceValue = document.getElementById('confidenceValue');
const inferenceValue = document.getElementById('inferenceValue');
const modelStatus = document.getElementById('model-status');

const themeToggle = document.getElementById('themeToggle');

// Training Elements
const slideEpochs = document.getElementById('slide-epochs');
const slideLr = document.getElementById('slide-lr');
const labelEpochs = document.getElementById('label-epochs');
const labelLr = document.getElementById('label-lr');
const unitsL1 = document.getElementById('units-l1');
const unitsL2 = document.getElementById('units-l2');
const unitsL3 = document.getElementById('units-l3');
const retrainButton = document.getElementById('retrainButton');
const trainMessage = document.getElementById('trainMessage');

// Encyclopedia Elements
const encyclopediaImg = document.getElementById('encyclopediaImg');
const encyclopediaName = document.getElementById('encyclopediaName');
const encyclopediaScientific = document.getElementById('encyclopediaScientific');
const encyclopediaRegions = document.getElementById('encyclopediaRegions');
const encyclopediaHabitat = document.getElementById('encyclopediaHabitat');
const encyclopediaFamily = document.getElementById('encyclopediaFamily');
const encyclopediaGenus = document.getElementById('encyclopediaGenus');

const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistory');

const STORAGE_KEY = 'irisvision-history';
let retrainChart = null;
let staticPoints = null;
let pcaChartInstance = null;
let pcaDataCache = null; // Store user point for theme changes

// Theme Toggle
function getThemePreference() {
  return localStorage.getItem('irisvision-theme') || 'light';
}

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('irisvision-theme', theme);
  themeToggle.querySelector('span').textContent = theme === 'dark' ? '☾' : '☼';
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
  // Redraw plot to match light/dark theme styles
  if (pcaDataCache) {
    drawDatasetPlot(pcaDataCache);
  }
});

// Tab Switcher
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(`tab-${tabId}`).classList.remove('hidden');
  
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`nav-${tabId}`).classList.add('active');
  
  const titles = {
    explorer: "Explorer Workspace",
    training: "Architecture Lab",
    reference: "Encyclopedia & History"
  };
  document.getElementById('page-title').textContent = titles[tabId];
}

// Preset Applier
const PRESETS = {
  setosa: [5.0, 3.4, 1.5, 0.2],
  versicolor: [5.9, 2.8, 4.3, 1.3],
  virginica: [6.6, 3.0, 5.6, 2.0]
};

function applyPreset(species) {
  const preset = PRESETS[species];
  slideSepalLength.value = preset[0];
  slideSepalWidth.value = preset[1];
  slidePetalLength.value = preset[2];
  slidePetalWidth.value = preset[3];
  
  updateSliderLabels();
  fetchPrediction();
}

function updateSliderLabels() {
  labelSepalLength.textContent = `${slideSepalLength.value} cm`;
  labelSepalWidth.textContent = `${slideSepalWidth.value} cm`;
  labelPetalLength.textContent = `${slidePetalLength.value} cm`;
  labelPetalWidth.textContent = `${slidePetalWidth.value} cm`;
}

// Sliders event listeners
[slideSepalLength, slideSepalWidth, slidePetalLength, slidePetalWidth].forEach(slider => {
  slider.addEventListener('input', () => {
    updateSliderLabels();
    fetchPrediction();
  });
});

let isPredicting = false;
let pendingPrediction = false;

// Fetch Real-time Prediction
async function fetchPrediction() {
  if (isPredicting) {
    pendingPrediction = true;
    return;
  }
  isPredicting = true;

  const payload = {
    "sepal length (cm)": parseFloat(slideSepalLength.value),
    "sepal width (cm)": parseFloat(slideSepalWidth.value),
    "petal length (cm)": parseFloat(slidePetalLength.value),
    "petal width (cm)": parseFloat(slidePetalWidth.value)
  };

  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    renderPrediction(data);
    updateNeuralSvg(data.activations);
    
    pcaDataCache = data.userPoint;
    drawDatasetPlot(data.userPoint);
  } catch (err) {
    console.error(err.message);
  } finally {
    isPredicting = false;
    if (pendingPrediction) {
      pendingPrediction = false;
      fetchPrediction();
    }
  }
}

// Render predictions outputs
function renderPrediction(data) {
  predictionName.textContent = data.displayName;
  predictionScientific.textContent = data.scientificName;
  predictionSummary.textContent = data.explanation.summary;
  confidenceValue.textContent = `${data.confidence}%`;
  inferenceValue.textContent = `${data.inferenceTime} ms`;

  // Render encyclopedia
  encyclopediaName.textContent = data.displayName;
  encyclopediaScientific.textContent = data.scientificName;
  encyclopediaRegions.textContent = data.flower.regions.join(', ');
  encyclopediaHabitat.textContent = data.flower.habitat;
  encyclopediaFamily.textContent = data.flower.family;
  encyclopediaGenus.textContent = data.flower.genus;

  // Add custom local flower image depending on species
  const imgUrls = {
    setosa: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg",
    versicolor: "https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg",
    virginica: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg"
  };
  encyclopediaImg.src = imgUrls[data.predictedClass] || encyclopediaImg.src;

  const staticFlowerImg = document.getElementById('staticFlowerImg');
  if (staticFlowerImg) {
    staticFlowerImg.src = imgUrls[data.predictedClass] || staticFlowerImg.src;
  }

  saveHistory(data);
}

// Neural Net SVG Drawing & Animating
const LAYER_CONFIG = [4, 8, 8, 8, 3]; // Input, Hidden 1, Hidden 2, Hidden 3, Output
let nodePositions = []; // Store X, Y coordinates

function initNeuralSvg() {
  const svg = document.getElementById('networkSvg');
  svg.innerHTML = '';
  nodePositions = [];
  
  const width = svg.clientWidth || 450;
  const height = svg.clientHeight || 320;
  const colWidth = width / (LAYER_CONFIG.length + 0.3);

  // 1. Calculate positions
  for (let col = 0; col < LAYER_CONFIG.length; col++) {
    const numNodes = LAYER_CONFIG[col];
    const colX = (col + 0.6) * colWidth;
    const colNodes = [];
    
    // Equal vertical spacing centered
    const ySpacing = height / (numNodes + 1);
    for (let row = 0; row < numNodes; row++) {
      colNodes.push({
        x: colX,
        y: (row + 1) * ySpacing
      });
    }
    nodePositions.push(colNodes);
  }

  // 2. Draw connections (Synapses)
  for (let col = 0; col < LAYER_CONFIG.length - 1; col++) {
    const currentLayer = nodePositions[col];
    const nextLayer = nodePositions[col + 1];
    
    for (let i = 0; i < currentLayer.length; i++) {
      for (let j = 0; j < nextLayer.length; j++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', currentLayer[i].x);
        line.setAttribute('y1', currentLayer[i].y);
        line.setAttribute('x2', nextLayer[j].x);
        line.setAttribute('y2', nextLayer[j].y);
        line.setAttribute('stroke', 'var(--border)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.2');
        line.classList.add('synapse');
        line.id = `synapse-${col}-${i}-${j}`;
        svg.appendChild(line);
      }
    }
  }

  // 3. Draw nodes
  for (let col = 0; col < LAYER_CONFIG.length; col++) {
    const layer = nodePositions[col];
    for (let i = 0; i < layer.length; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', layer[i].x);
      circle.setAttribute('cy', layer[i].y);
      circle.setAttribute('r', col === 0 || col === LAYER_CONFIG.length - 1 ? '7' : '5.5');
      circle.setAttribute('fill', 'var(--border)');
      circle.setAttribute('stroke', 'var(--bg)');
      circle.setAttribute('stroke-width', '1.5');
      circle.classList.add('node');
      circle.id = `node-${col}-${i}`;
      svg.appendChild(circle);
    }
  }
}

// Update activation states dynamically
function updateNeuralSvg(activations) {
  // Map activations object
  const states = [
    activations.inputs,      // Layer 0
    activations.hidden[0],   // Layer 1
    activations.hidden[1],   // Layer 2
    activations.hidden[2],   // Layer 3
    activations.output       // Layer 4
  ];

  // 1. Update nodes lighting
  for (let col = 0; col < LAYER_CONFIG.length; col++) {
    const values = states[col] || [];
    const maxVal = Math.max(...values, 1e-8);
    for (let i = 0; i < LAYER_CONFIG[col]; i++) {
      const val = values[i] || 0;
      const normalized = Math.min(1.0, Math.max(0.1, val / maxVal)); // Normalized to [0.1, 1]
      
      const node = document.getElementById(`node-${col}-${i}`);
      if (node) {
        if (col === 0) {
          // Input: color coding based on feature scale
          node.setAttribute('fill', 'rgba(168, 85, 247, 0.9)');
        } else if (col === LAYER_CONFIG.length - 1) {
          // Output node lighting (high activation glows green/gold)
          if (i === values.indexOf(maxVal) && maxVal > 0.5) {
            node.setAttribute('fill', 'rgba(16, 185, 129, 0.95)'); // Glow emerald
          } else {
            node.setAttribute('fill', 'rgba(148, 163, 184, 0.4)');
          }
        } else {
          // Hidden node activation opacity
          node.setAttribute('fill', `rgba(168, 85, 247, ${0.25 + normalized * 0.75})`);
          node.style.filter = normalized > 0.6 ? 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.85))' : 'none';
        }
      }
    }
  }

  // 2. Update synapses pulsing speed based on target node activation
  for (let col = 0; col < LAYER_CONFIG.length - 1; col++) {
    const targetValues = states[col + 1] || [];
    const maxTarget = Math.max(...targetValues, 1e-8);
    
    for (let i = 0; i < LAYER_CONFIG[col]; i++) {
      for (let j = 0; j < LAYER_CONFIG[col + 1]; j++) {
        const line = document.getElementById(`synapse-${col}-${i}-${j}`);
        if (line) {
          const targetVal = targetValues[j] || 0;
          const targetNorm = targetVal / maxTarget;
          
          if (targetNorm > 0.15) {
            line.setAttribute('opacity', `${0.25 + targetNorm * 0.55}`);
            line.setAttribute('stroke', 'var(--accent)');
            line.setAttribute('stroke-width', '1.5');
            line.style.animationDuration = `${5 - targetNorm * 4}s`; // Faster pulse for active layers
          } else {
            line.setAttribute('opacity', '0.12');
            line.setAttribute('stroke', 'var(--border)');
            line.setAttribute('stroke-width', '0.8');
            line.style.animationDuration = '12s';
          }
        }
      }
    }
  }
}

function drawDatasetPlot(userPoint) {
  if (!staticPoints || !userPoint) return;
  
  const canvas = document.getElementById('pcaChart');
  if (!canvas) return;
  
  if (pcaChartInstance) pcaChartInstance.destroy();
  
  const setosaData = [];
  const versicolorData = [];
  const virginicaData = [];
  
  staticPoints.forEach(p => {
    if (p.species === 'setosa') setosaData.push({ x: p.x, y: p.y });
    else if (p.species === 'versicolor') versicolorData.push({ x: p.x, y: p.y });
    else if (p.species === 'virginica') virginicaData.push({ x: p.x, y: p.y });
  });

  const isDark = document.body.classList.contains('dark');
  const textColor = isDark ? '#9ca3af' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(147, 51, 234, 0.04)';

  const ctx = canvas.getContext('2d');
  pcaChartInstance = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Setosa',
          data: setosaData,
          backgroundColor: '#3b82f6',
          pointRadius: 4
        },
        {
          label: 'Versicolor',
          data: versicolorData,
          backgroundColor: '#f59e0b',
          pointRadius: 4
        },
        {
          label: 'Virginica',
          data: virginicaData,
          backgroundColor: '#10b981',
          pointRadius: 4
        },
        {
          label: 'Current Flower',
          data: [{ x: userPoint.petalLength, y: userPoint.petalWidth }],
          backgroundColor: '#ec4899',
          pointRadius: 10,
          pointStyle: 'rectRot',
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor, font: { family: 'Space Grotesk', size: 9, weight: 'bold' } }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Petal Length (cm)', color: textColor, font: { family: 'Space Grotesk', size: 8, weight: 'bold' } },
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Space Grotesk', size: 8 } }
        },
        y: {
          title: { display: true, text: 'Petal Width (cm)', color: textColor, font: { family: 'Space Grotesk', size: 8, weight: 'bold' } },
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Space Grotesk', size: 8 } }
        }
      }
    }
  });
}

// Live retraining simulator
slideEpochs.addEventListener('input', (e) => labelEpochs.textContent = e.target.value);
slideLr.addEventListener('input', (e) => labelLr.textContent = e.target.value);

retrainButton.addEventListener('click', async () => {
  retrainButton.disabled = true;
  retrainButton.textContent = 'Training Model...';
  trainMessage.textContent = 'Fitting ANN on the Iris dataset...';
  modelStatus.textContent = 'Training...';
  
  const payload = {
    epochs: parseInt(slideEpochs.value),
    learningRate: parseFloat(slideLr.value),
    hiddenLayers: [
      parseInt(unitsL1.value || 256),
      parseInt(unitsL2.value || 128),
      parseInt(unitsL3.value || 64)
    ]
  };

  try {
    const res = await fetch('/retrain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    trainMessage.textContent = `Retrained in ${data.trainingTimeMs} ms.`;
    modelStatus.textContent = 'Custom ANN Active';
    
    // Draw training graphs
    drawRetrainChart(data);
    
    // Recalculate neural network positions in case size changed
    LAYER_CONFIG[1] = Math.min(8, payload.hiddenLayers[0]);
    LAYER_CONFIG[2] = Math.min(8, payload.hiddenLayers[1]);
    LAYER_CONFIG[3] = Math.min(8, payload.hiddenLayers[2]);
    initNeuralSvg();
    
    // Refresh prediction
    fetchPrediction();
  } catch (err) {
    trainMessage.textContent = err.message;
    modelStatus.textContent = 'Error';
  } finally {
    retrainButton.disabled = false;
    retrainButton.textContent = 'Reconstruct & Retrain Model';
  }
});

function drawRetrainChart(data) {
  if (retrainChart) retrainChart.destroy();
  
  const ctx = document.getElementById('retrainChart').getContext('2d');
  retrainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.epochs,
      datasets: [
        { label: 'Train Accuracy', data: data.history.accuracy, borderColor: '#a855f7', tension: 0.2 },
        { label: 'Val Accuracy', data: data.history.val_accuracy, borderColor: '#10b981', tension: 0.2 },
        { label: 'Train Loss', data: data.history.loss, borderColor: '#ef4444', borderDash: [4, 4], tension: 0.2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// History Logger
function saveHistory(entry) {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  // Throttle logs for real-time slider drags (only save if prediction changed or every 10 predictions)
  if (history.length > 0 && history[0].prediction === entry.displayName) {
    return;
  }
  
  history.unshift({
    prediction: entry.displayName,
    confidence: entry.confidence,
    timestamp: new Date().toLocaleTimeString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 8)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!history.length) {
    historyList.innerHTML = '<div class="text-xs text-[var(--muted)] text-center py-6">Inference records are empty.</div>';
    return;
  }
  historyList.innerHTML = history.map(item => `
    <div class="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-xs flex justify-between items-center">
      <div>
        <p class="font-bold text-[var(--text)]">${item.prediction}</p>
        <p class="text-[10px] text-[var(--muted)] mt-0.5">${item.timestamp}</p>
      </div>
      <span class="px-2 py-0.5 rounded-full border border-[var(--border)] font-semibold text-[var(--text)]">${item.confidence}%</span>
    </div>
  `).join('');
}

clearHistoryButton.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

async function loadDataset() {
  try {
    const res = await fetch('/dataset');
    const data = await res.json();
    staticPoints = data.points;
  } catch (err) {
    console.error("Failed loading dataset:", err);
  }
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(getThemePreference());
  updateSliderLabels();
  initNeuralSvg();
  
  loadDataset().then(() => {
    if (pcaDataCache) {
      drawDatasetPlot(pcaDataCache);
    }
  });

  fetchPrediction();
  renderHistory();
});

// Handle resize of SVG canvas
window.addEventListener('resize', () => {
  initNeuralSvg();
});
