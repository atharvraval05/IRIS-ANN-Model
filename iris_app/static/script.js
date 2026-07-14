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
