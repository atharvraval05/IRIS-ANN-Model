// Static PCA Cluster Data
const PCA_MEAN = [5.8433, 3.0573, 3.758, 1.1993];
const PCA_COMPONENTS = [[0.3614, 0.6566, -0.582], [-0.0845, 0.7302, 0.5979], [0.8567, -0.1734, 0.0762], [0.3583, -0.0755, 0.5458]];
const STATIC_PCA_POINTS = [{"x": -2.6841, "y": 0.3194, "z": -0.0279, "species": "setosa"}, {"x": -2.7141, "y": -0.177, "z": -0.2105, "species": "setosa"}, {"x": -2.889, "y": -0.1449, "z": 0.0179, "species": "setosa"}, {"x": -2.7453, "y": -0.3183, "z": 0.0316, "species": "setosa"}, {"x": -2.7287, "y": 0.3268, "z": 0.0901, "species": "setosa"}, {"x": -2.2809, "y": 0.7413, "z": 0.1687, "species": "setosa"}, {"x": -2.8205, "y": -0.0895, "z": 0.2579, "species": "setosa"}, {"x": -2.6261, "y": 0.1634, "z": -0.0219, "species": "setosa"}, {"x": -2.8864, "y": -0.5783, "z": 0.0208, "species": "setosa"}, {"x": -2.6728, "y": -0.1138, "z": -0.1976, "species": "setosa"}, {"x": -2.5069, "y": 0.6451, "z": -0.0753, "species": "setosa"}, {"x": -2.6128, "y": 0.0147, "z": 0.1022, "species": "setosa"}, {"x": -2.7861, "y": -0.2351, "z": -0.2068, "species": "setosa"}, {"x": -3.2238, "y": -0.5114, "z": 0.0613, "species": "setosa"}, {"x": -2.6448, "y": 1.1788, "z": -0.1516, "species": "setosa"}, {"x": -2.386, "y": 1.3381, "z": 0.2778, "species": "setosa"}, {"x": -2.6235, "y": 0.8107, "z": 0.1382, "species": "setosa"}, {"x": -2.6483, "y": 0.3118, "z": 0.0267, "species": "setosa"}, {"x": -2.1998, "y": 0.8728, "z": -0.1203, "species": "setosa"}, {"x": -2.588, "y": 0.5136, "z": 0.2137, "species": "setosa"}, {"x": -2.3103, "y": 0.3913, "z": -0.2394, "species": "setosa"}, {"x": -2.5437, "y": 0.433, "z": 0.2085, "species": "setosa"}, {"x": -3.2159, "y": 0.1335, "z": 0.2924, "species": "setosa"}, {"x": -2.3027, "y": 0.0987, "z": 0.0391, "species": "setosa"}, {"x": -2.3558, "y": -0.0373, "z": 0.125, "species": "setosa"}, {"x": -2.5067, "y": -0.146, "z": -0.2534, "species": "setosa"}, {"x": -2.4688, "y": 0.131, "z": 0.0949, "species": "setosa"}, {"x": -2.5623, "y": 0.3677, "z": -0.0785, "species": "setosa"}, {"x": -2.6395, "y": 0.312, "z": -0.1459, "species": "setosa"}, {"x": -2.632, "y": -0.197, "z": 0.0408, "species": "setosa"}, {"x": -2.5874, "y": -0.2043, "z": -0.0772, "species": "setosa"}, {"x": -2.4099, "y": 0.4109, "z": -0.1455, "species": "setosa"}, {"x": -2.6489, "y": 0.8134, "z": 0.2257, "species": "setosa"}, {"x": -2.5987, "y": 1.0931, "z": 0.1578, "species": "setosa"}, {"x": -2.6369, "y": -0.1213, "z": -0.143, "species": "setosa"}, {"x": -2.8662, "y": 0.0694, "z": -0.1643, "species": "setosa"}, {"x": -2.6252, "y": 0.5994, "z": -0.2684, "species": "setosa"}, {"x": -2.8007, "y": 0.2686, "z": 0.0937, "species": "setosa"}, {"x": -2.9805, "y": -0.488, "z": 0.0729, "species": "setosa"}, {"x": -2.59, "y": 0.229, "z": -0.0801, "species": "setosa"}, {"x": -2.7701, "y": 0.2635, "z": 0.0772, "species": "setosa"}, {"x": -2.8494, "y": -0.941, "z": -0.3492, "species": "setosa"}, {"x": -2.9974, "y": -0.3419, "z": 0.1925, "species": "setosa"}, {"x": -2.4056, "y": 0.1889, "z": 0.2639, "species": "setosa"}, {"x": -2.2095, "y": 0.4367, "z": 0.2987, "species": "setosa"}, {"x": -2.7145, "y": -0.2502, "z": -0.0977, "species": "setosa"}, {"x": -2.5381, "y": 0.5038, "z": 0.1667, "species": "setosa"}, {"x": -2.8395, "y": -0.2279, "z": 0.0837, "species": "setosa"}, {"x": -2.5431, "y": 0.5794, "z": -0.0171, "species": "setosa"}, {"x": -2.7034, "y": 0.1077, "z": -0.0893, "species": "setosa"}, {"x": 1.2848, "y": 0.6852, "z": -0.4066, "species": "versicolor"}, {"x": 0.9325, "y": 0.3183, "z": -0.018, "species": "versicolor"}, {"x": 1.4643, "y": 0.5043, "z": -0.3383, "species": "versicolor"}, {"x": 0.1833, "y": -0.828, "z": -0.1796, "species": "versicolor"}, {"x": 1.0881, "y": 0.0746, "z": -0.3078, "species": "versicolor"}, {"x": 0.6417, "y": -0.4182, "z": 0.0411, "species": "versicolor"}, {"x": 1.0951, "y": 0.2835, "z": 0.1698, "species": "versicolor"}, {"x": -0.7491, "y": -1.0049, "z": 0.0123, "species": "versicolor"}, {"x": 1.0441, "y": 0.2284, "z": -0.4153, "species": "versicolor"}, {"x": -0.0087, "y": -0.7231, "z": 0.2811, "species": "versicolor"}, {"x": -0.5078, "y": -1.266, "z": -0.2698, "species": "versicolor"}, {"x": 0.5117, "y": -0.104, "z": 0.1305, "species": "versicolor"}, {"x": 0.265, "y": -0.55, "z": -0.6941, "species": "versicolor"}, {"x": 0.9849, "y": -0.1248, "z": -0.0621, "species": "versicolor"}, {"x": -0.1739, "y": -0.2549, "z": 0.0905, "species": "versicolor"}, {"x": 0.9279, "y": 0.4672, "z": -0.3146, "species": "versicolor"}, {"x": 0.6603, "y": -0.353, "z": 0.328, "species": "versicolor"}, {"x": 0.2361, "y": -0.3336, "z": -0.2712, "species": "versicolor"}, {"x": 0.9447, "y": -0.5431, "z": -0.4995, "species": "versicolor"}, {"x": 0.0452, "y": -0.5838, "z": -0.235, "species": "versicolor"}, {"x": 1.1163, "y": -0.0846, "z": 0.4596, "species": "versicolor"}, {"x": 0.3579, "y": -0.0689, "z": -0.2299, "species": "versicolor"}, {"x": 1.2982, "y": -0.3278, "z": -0.3479, "species": "versicolor"}, {"x": 0.9217, "y": -0.1827, "z": -0.2311, "species": "versicolor"}, {"x": 0.7149, "y": 0.1491, "z": -0.3218, "species": "versicolor"}, {"x": 0.9002, "y": 0.3285, "z": -0.3162, "species": "versicolor"}, {"x": 1.332, "y": 0.2444, "z": -0.5217, "species": "versicolor"}, {"x": 1.5578, "y": 0.2675, "z": -0.1649, "species": "versicolor"}, {"x": 0.8133, "y": -0.1634, "z": 0.0354, "species": "versicolor"}, {"x": -0.3056, "y": -0.3683, "z": -0.3185, "species": "versicolor"}, {"x": -0.0681, "y": -0.7052, "z": -0.2442, "species": "versicolor"}, {"x": -0.1896, "y": -0.6803, "z": -0.3064, "species": "versicolor"}, {"x": 0.1364, "y": -0.314, "z": -0.1772, "species": "versicolor"}, {"x": 1.38, "y": -0.421, "z": 0.0162, "species": "versicolor"}, {"x": 0.588, "y": -0.4843, "z": 0.4444, "species": "versicolor"}, {"x": 0.8069, "y": 0.1942, "z": 0.389, "species": "versicolor"}, {"x": 1.2207, "y": 0.4076, "z": -0.2372, "species": "versicolor"}, {"x": 0.8151, "y": -0.372, "z": -0.6147, "species": "versicolor"}, {"x": 0.246, "y": -0.2685, "z": 0.1884, "species": "versicolor"}, {"x": 0.1664, "y": -0.6819, "z": -0.06, "species": "versicolor"}, {"x": 0.4648, "y": -0.6707, "z": -0.0243, "species": "versicolor"}, {"x": 0.8908, "y": -0.0345, "z": -0.0099, "species": "versicolor"}, {"x": 0.2305, "y": -0.4044, "z": -0.2294, "species": "versicolor"}, {"x": -0.7045, "y": -1.0122, "z": -0.1057, "species": "versicolor"}, {"x": 0.357, "y": -0.5049, "z": 0.0166, "species": "versicolor"}, {"x": 0.3319, "y": -0.2127, "z": 0.0832, "species": "versicolor"}, {"x": 0.3762, "y": -0.2932, "z": 0.078, "species": "versicolor"}, {"x": 0.6426, "y": 0.0177, "z": -0.2054, "species": "versicolor"}, {"x": -0.9065, "y": -0.7561, "z": -0.0126, "species": "versicolor"}, {"x": 0.299, "y": -0.3489, "z": 0.0106, "species": "versicolor"}, {"x": 2.5312, "y": -0.0098, "z": 0.7602, "species": "virginica"}, {"x": 1.4152, "y": -0.5749, "z": 0.2963, "species": "virginica"}, {"x": 2.6167, "y": 0.3439, "z": -0.1108, "species": "virginica"}, {"x": 1.9715, "y": -0.1797, "z": 0.1084, "species": "virginica"}, {"x": 2.35, "y": -0.0403, "z": 0.2854, "species": "virginica"}, {"x": 3.397, "y": 0.5508, "z": -0.3484, "species": "virginica"}, {"x": 0.5212, "y": -1.1928, "z": 0.5457, "species": "virginica"}, {"x": 2.9326, "y": 0.3555, "z": -0.4202, "species": "virginica"}, {"x": 2.3212, "y": -0.2438, "z": -0.3483, "species": "virginica"}, {"x": 2.9168, "y": 0.7828, "z": 0.4233, "species": "virginica"}, {"x": 1.6618, "y": 0.2422, "z": 0.2424, "species": "virginica"}, {"x": 1.8034, "y": -0.2156, "z": -0.0376, "species": "virginica"}, {"x": 2.1656, "y": 0.2163, "z": 0.0333, "species": "virginica"}, {"x": 1.3462, "y": -0.7768, "z": 0.2819, "species": "virginica"}, {"x": 1.5859, "y": -0.5396, "z": 0.629, "species": "virginica"}, {"x": 1.9045, "y": 0.1193, "z": 0.4796, "species": "virginica"}, {"x": 1.9497, "y": 0.0419, "z": 0.0442, "species": "virginica"}, {"x": 3.4871, "y": 1.1757, "z": 0.1339, "species": "virginica"}, {"x": 3.7956, "y": 0.2573, "z": -0.5138, "species": "virginica"}, {"x": 1.3008, "y": -0.7611, "z": -0.345, "species": "virginica"}, {"x": 2.4278, "y": 0.3782, "z": 0.2191, "species": "virginica"}, {"x": 1.199, "y": -0.6061, "z": 0.5119, "species": "virginica"}, {"x": 3.4999, "y": 0.4607, "z": -0.5732, "species": "virginica"}, {"x": 1.3888, "y": -0.2044, "z": -0.0645, "species": "virginica"}, {"x": 2.2754, "y": 0.335, "z": 0.2862, "species": "virginica"}, {"x": 2.6141, "y": 0.5609, "z": -0.2055, "species": "virginica"}, {"x": 1.2585, "y": -0.1797, "z": 0.0458, "species": "virginica"}, {"x": 1.2911, "y": -0.1167, "z": 0.2313, "species": "virginica"}, {"x": 2.1236, "y": -0.2097, "z": 0.1542, "species": "virginica"}, {"x": 2.388, "y": 0.4646, "z": -0.4495, "species": "virginica"}, {"x": 2.8417, "y": 0.3753, "z": -0.4989, "species": "virginica"}, {"x": 3.2307, "y": 1.3742, "z": -0.1145, "species": "virginica"}, {"x": 2.1594, "y": -0.2173, "z": 0.2088, "species": "virginica"}, {"x": 1.4442, "y": -0.1434, "z": -0.1532, "species": "virginica"}, {"x": 1.7813, "y": -0.4999, "z": -0.1729, "species": "virginica"}, {"x": 3.0765, "y": 0.6881, "z": -0.3356, "species": "virginica"}, {"x": 2.1442, "y": 0.1401, "z": 0.7349, "species": "virginica"}, {"x": 1.9051, "y": 0.0493, "z": 0.1622, "species": "virginica"}, {"x": 1.1693, "y": -0.165, "z": 0.2818, "species": "virginica"}, {"x": 2.1076, "y": 0.3723, "z": 0.0273, "species": "virginica"}, {"x": 2.3142, "y": 0.1837, "z": 0.3227, "species": "virginica"}, {"x": 1.9223, "y": 0.4092, "z": 0.1136, "species": "virginica"}, {"x": 1.4152, "y": -0.5749, "z": 0.2963, "species": "virginica"}, {"x": 2.563, "y": 0.2779, "z": 0.2926, "species": "virginica"}, {"x": 2.4187, "y": 0.3048, "z": 0.5045, "species": "virginica"}, {"x": 1.9441, "y": 0.1875, "z": 0.1778, "species": "virginica"}, {"x": 1.5272, "y": -0.3753, "z": -0.1219, "species": "virginica"}, {"x": 1.7643, "y": 0.0789, "z": 0.1305, "species": "virginica"}, {"x": 1.9009, "y": 0.1166, "z": 0.7233, "species": "virginica"}, {"x": 1.3902, "y": -0.2827, "z": 0.3629, "species": "virginica"}];

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
const staticFlowerImg = document.getElementById('staticFlowerImg');

// Update Slider Labels text representation
function updateSliderLabels() {
  labelSepalLength.textContent = `${parseFloat(slideSepalLength.value).toFixed(1)} cm`;
  labelSepalWidth.textContent = `${parseFloat(slideSepalWidth.value).toFixed(1)} cm`;
  labelPetalLength.textContent = `${parseFloat(slidePetalLength.value).toFixed(1)} cm`;
  labelPetalWidth.textContent = `${parseFloat(slidePetalWidth.value).toFixed(1)} cm`;
}

// Bind sliders events for interactive inputs
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

  const values = [
    parseFloat(slideSepalLength.value),
    parseFloat(slideSepalWidth.value),
    parseFloat(slidePetalLength.value),
    parseFloat(slidePetalWidth.value)
  ];

  const payload = {
    "sepal length (cm)": values[0],
    "sepal width (cm)": values[1],
    "petal length (cm)": values[2],
    "petal width (cm)": values[3]
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
    
    // Project 3D coordinate locally and update plot
    const userPca = projectUserPca(values);
    drawPcaPlot(userPca);
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

// Project user parameters into PCA space locally (instantaneous calculation)
function projectUserPca(values) {
  const centered = values.map((val, idx) => val - PCA_MEAN[idx]);
  const x_pca = [0, 0, 0];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      x_pca[col] += centered[row] * PCA_COMPONENTS[row][col];
    }
  }
  return { x: x_pca[0], y: x_pca[1], z: x_pca[2] };
}

// Plotly 3D scatter coordinate drawing
function drawPcaPlot(userPoint) {
  if (typeof Plotly === 'undefined') {
    console.warn("Plotly is not loaded yet. Skipping 3D plot.");
    return;
  }
  try {
    const speciesData = {
      setosa: { x: [], y: [], z: [], name: 'Setosa', mode: 'markers', type: 'scatter3d', marker: { size: 3, color: '#3b82f6', opacity: 0.6 } },
      versicolor: { x: [], y: [], z: [], name: 'Versicolor', mode: 'markers', type: 'scatter3d', marker: { size: 3, color: '#f59e0b', opacity: 0.6 } },
      virginica: { x: [], y: [], z: [], name: 'Virginica', mode: 'markers', type: 'scatter3d', marker: { size: 3, color: '#10b981', opacity: 0.6 } }
    };

    STATIC_PCA_POINTS.forEach(p => {
      if (speciesData[p.species]) {
        speciesData[p.species].x.push(p.x);
        speciesData[p.species].y.push(p.y);
        speciesData[p.species].z.push(p.z);
      }
    });

    const userTrace = {
      x: [userPoint.x],
      y: [userPoint.y],
      z: [userPoint.z],
      name: 'Current Flower',
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 8,
        color: '#ec4899', // Pulsing Pink
        symbol: 'diamond',
        line: { color: '#ffffff', width: 2 }
      }
    };

    const layout = {
      autosize: true,
      margin: { l: 0, r: 0, b: 0, t: 0 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      scene: {
        xaxis: { title: '', showgrid: true, gridcolor: '#e2e8f0', backgroundcolor: '#f8fafc', showticklabels: false },
        yaxis: { title: '', showgrid: true, gridcolor: '#e2e8f0', backgroundcolor: '#f8fafc', showticklabels: false },
        zaxis: { title: '', showgrid: true, gridcolor: '#e2e8f0', backgroundcolor: '#f8fafc', showticklabels: false }
      },
      legend: {
        x: 0,
        y: 1,
        font: { color: '#64748b', size: 10 }
      }
    };

    const plotData = [speciesData.setosa, speciesData.versicolor, speciesData.virginica, userTrace];
    Plotly.react('pcaDiv', plotData, layout, { displayModeBar: false });
  } catch (err) {
    console.error("Plotly render failed:", err);
  }
}

// Render predictions outputs
function renderPrediction(data) {
  predictionName.textContent = data.displayName;
  predictionScientific.textContent = data.scientificName;
  predictionSummary.textContent = data.explanation.summary;
  confidenceValue.textContent = `${data.confidence}%`;
  inferenceValue.textContent = `${data.inferenceTime} ms`;

  // Add custom local flower image depending on species
  const imgUrls = {
    setosa: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg",
    versicolor: "https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg",
    virginica: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg"
  };
  
  if (staticFlowerImg) {
    staticFlowerImg.src = imgUrls[data.predictedClass] || staticFlowerImg.src;
  }
}

// Initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
  updateSliderLabels();
  fetchPrediction();
});
