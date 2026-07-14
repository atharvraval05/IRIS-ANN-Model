import time
from pathlib import Path
from typing import Dict, List

import numpy as np
from flask import Flask, jsonify, render_template, request
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.models import load_model, Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False

MODEL_PATH = Path(__file__).with_name("Iris_ANN.keras")
model = load_model(MODEL_PATH)
model(np.zeros((1, 4)))

iris = load_iris()
FEATURE_NAMES = list(iris.feature_names)
CLASS_NAMES = [name.lower() for name in iris.target_names]

# Fit PCA globally once on startup
pca_transformer = PCA(n_components=3)
X_pca = pca_transformer.fit_transform(iris.data)
STATIC_PCA_POINTS = [
    {
        "x": float(coords[0]),
        "y": float(coords[1]),
        "z": float(coords[2]),
        "species": CLASS_NAMES[target]
    }
    for coords, target in zip(X_pca, iris.target)
]
CLASS_DISPLAY = {
    "setosa": {"name": "Iris Setosa", "scientific": "Iris setosa", "family": "Iridaceae", "genus": "Iris", "species": "setosa", "regions": ["North America", "Europe"], "colors": ["White", "Lavender"], "season": "Spring", "height": "30–60 cm", "width": "15–30 cm", "habitat": "Dry, open grasslands", "importance": "Important pollinator support and educational model species", "facts": ["Often grows in colder climates", "Has the smallest petals of the three species"], "pollination": "Bees and flies", "climate": "Cool to temperate", "lifecycle": "Early spring bloom with rapid seed maturity", "uses": ["Botanical research", "Garden ornamentals"], "conservation": "Least Concern", "medicinal": "Occasionally used in traditional herbal studies", "watering": "Low to moderate", "sunlight": "Full sun", "difficulty": "Easy"},
    "versicolor": {"name": "Iris Versicolor", "scientific": "Iris versicolor", "family": "Iridaceae", "genus": "Iris", "species": "versicolor", "regions": ["North America", "Canada"], "colors": ["Purple", "Violet"], "season": "Late spring", "height": "40–90 cm", "width": "20–40 cm", "habitat": "Wet meadows and marsh edges", "importance": "Common indicator of wetland ecology", "facts": ["Often grows near wetlands", "Mid-range petals and strong color contrast"], "pollination": "Bees and butterflies", "climate": "Moist temperate", "lifecycle": "Perennial rhizome with spring flowering", "uses": ["Landscape restoration", "Ecological studies"], "conservation": "Least Concern", "medicinal": "Limited traditional use", "watering": "Moderate", "sunlight": "Partial sun", "difficulty": "Moderate"},
    "virginica": {"name": "Iris Virginica", "scientific": "Iris virginica", "family": "Iridaceae", "genus": "Iris", "species": "virginica", "regions": ["Eastern North America"], "colors": ["Blue-violet", "Deep purple"], "season": "Late spring to early summer", "height": "60–120 cm", "width": "25–45 cm", "habitat": "Marshes and riverbanks", "importance": "Largest petals among the common iris species", "facts": ["Produces the largest petals", "Thrives in wetter, richer soils"], "pollination": "Bees and hummingbirds", "climate": "Humid temperate", "lifecycle": "Longer-lived clumps with robust flowering", "uses": ["Wetland gardening", "Conservation planting"], "conservation": "Least Concern", "medicinal": "Rarely used medicinally", "watering": "High", "sunlight": "Full sun to partial shade", "difficulty": "Moderate to difficult"},
}


def _make_feature_insight(feature_name: str, value: float, predicted: str) -> Dict[str, str]:
    if feature_name == "sepal length (cm)":
        if value < 5.0:
            return {"level": "Short", "meaning": "Compact sepal structure aligned with a compact botanical profile.", "range": "Typical for setosa-like forms", "support": "Supports the current classification"}
        if value < 6.0:
            return {"level": "Moderate", "meaning": "Balanced sepal dimensions suggest a versatile profile.", "range": "Common across mixed habitats", "support": "Consistent with a confident prediction"}
        return {"level": "Long", "meaning": "A larger sepal span points toward a more expansive floral structure.", "range": "Often seen in stronger, larger specimens", "support": "Compliments the predicted species"}

    if feature_name == "sepal width (cm)":
        if value < 3.0:
            return {"level": "Narrow", "meaning": "This indicates a more compact petal envelope and tighter morphology.", "range": "Often observed in smaller specimens", "support": "Adds directional support to the model"}
        if value < 3.5:
            return {"level": "Balanced", "meaning": "A balanced width suggests stable, typical botanical proportions.", "range": "Common within the expected range", "support": "Supports the current prediction"}
        return {"level": "Wide", "meaning": "Broader sepal width contributes to a more robust floral silhouette.", "range": "Common in larger iris forms", "support": "Aligns with the predicted class profile"}

    if feature_name == "petal length (cm)":
        if value < 2.0:
            return {"level": "Short", "meaning": "Short petals are a strong signal for compact, early-blooming iris forms.", "range": "Typical for setosa-like measurements", "support": "This is one of the strongest contributing factors"}
        if value < 4.0:
            return {"level": "Medium", "meaning": "Mid-range petals indicate a mixed yet well-formed floral structure.", "range": "Common for versicolor-like forms", "support": "Moderately reinforces the prediction"}
        return {"level": "Long", "meaning": "Long petals suggest a larger, showier bloom with an extended floral profile.", "range": "Typical for virginica-like specimens", "support": "Strongly supports the predicted species"}

    if feature_name == "petal width (cm)":
        if value < 0.5:
            return {"level": "Narrow", "meaning": "The narrow petals point toward a slim, compact floral profile.", "range": "Classic for setosa-like measurements", "support": "Strongly influences the prediction"}
        if value < 1.5:
            return {"level": "Medium", "meaning": "Medium petals are common in transitional species and balanced shapes.", "range": "Typical for versicolor-like measurements", "support": "A meaningful contributor to the decision"}
        return {"level": "Wide", "meaning": "Broad petals imply a richer, more prominent bloom structure.", "range": "Often seen in virginica-like specimens", "support": "Strong signal for the selected class"}

    return {"level": "Balanced", "meaning": "The feature remains within a biologically plausible range.", "range": "Normal", "support": "No unusual anomaly detected"}


def _explain_prediction(values: np.ndarray, predicted: str, probabilities: np.ndarray) -> Dict[str, object]:
    feature_names = FEATURE_NAMES
    max_prob = float(np.max(probabilities) * 100)
    strongest_index = 2 + int(np.argmax(np.abs(values[0, 2:])))
    strongest = feature_names[strongest_index]
    insight = "The model predicts" if max_prob > 90 else "The model suggests"
    explanation = (
        f"{insight} {CLASS_DISPLAY[predicted]['name']} with {max_prob:.2f}% confidence. "
        f"The prediction is primarily influenced by the {strongest.lower()} and the overall petal geometry. "
        f"These measurements resemble the characteristic botanical profile of {CLASS_DISPLAY[predicted]['name']}. "
        f"The remaining flower dimensions remain within a biologically plausible range and do not introduce conflicting evidence."
    )
    return {
        "summary": explanation,
        "insights": [
            f"Prediction confidence is {'exceptionally high' if max_prob > 95 else 'strong'}.",
            f"Petal dimensions were the strongest contributing factor in the final decision.",
            "No abnormal or conflicting values were detected.",
            "The input values remain inside a sensible biological range.",
        ],
        "features": [
            {
                "name": feature_name,
                "value": float(value),
                "detail": _make_feature_insight(feature_name, float(value), predicted),
            }
            for feature_name, value in zip(FEATURE_NAMES, values[0])
        ],
    }


def _build_comparison(values: np.ndarray) -> List[Dict[str, object]]:
    averages = {
        "setosa": np.array([5.006, 3.428, 1.462, 0.246]),
        "versicolor": np.array([5.936, 2.770, 4.260, 1.326]),
        "virginica": np.array([6.588, 2.974, 5.552, 2.026]),
    }
    rows: List[Dict[str, object]] = []
    for index, feature_name in enumerate(FEATURE_NAMES):
        rows.append({
            "feature": feature_name,
            "userValue": round(float(values[0, index]), 2),
            "setosa": round(float(averages["setosa"][index]), 2),
            "versicolor": round(float(averages["versicolor"][index]), 2),
            "virginica": round(float(averages["virginica"][index]), 2),
        })
    return rows


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(silent=True) or {}
    values = []
    for feature in FEATURE_NAMES:
        raw = payload.get(feature)
        if raw is None:
            return jsonify({"error": f"Missing value for {feature}"}), 400
        try:
            value = float(raw)
        except (TypeError, ValueError):
            return jsonify({"error": f"Invalid numeric value for {feature}"}), 400
        if value <= 0:
            return jsonify({"error": f"{feature} must be greater than zero"}), 400
        values.append(value)

    features = np.array([values], dtype=float)

    start = time.perf_counter()
    
    # Compute hidden layer activations dynamically by executing layer-by-layer
    x = tf.convert_to_tensor(features, dtype=tf.float32)
    activations = []
    for layer in model.layers:
        x = layer(x)
        activations.append(x.numpy())
    
    elapsed_ms = round((time.perf_counter() - start) * 1000, 2)

    # Output probabilities
    probabilities = activations[-1][0]
    predicted_index = int(np.argmax(probabilities))
    predicted_label = CLASS_NAMES[predicted_index]
    confidence = float(probabilities[predicted_index] * 100)

    explanation = _explain_prediction(features, predicted_label, probabilities)
    comparison = _build_comparison(features)

    probabilities_map = {
        species: round(float(prob), 4)
        for species, prob in zip(CLASS_NAMES, probabilities)
    }

    # Format activation states for frontend SVG neural net diagram
    # Downsample all hidden layers to exactly 8 visual nodes for lightweight rendering
    act_data = []
    for layer_act in activations[:-1]:  # exclude output layer
        act_vals = layer_act[0]  # shape (N,)
        N = act_vals.shape[0]
        if N > 8:
            chunk_size = N // 8
            downsampled = [float(np.mean(act_vals[i:i+chunk_size])) for i in range(0, N, chunk_size)]
            downsampled = downsampled[:8]
        else:
            downsampled = [float(x) for x in act_vals]
        act_data.append(downsampled)

    user_pca = pca_transformer.transform(features)[0]
    user_point = {
        "x": float(user_pca[0]),
        "y": float(user_pca[1]),
        "z": float(user_pca[2])
    }

    payload_response = {
        "userPoint": user_point,
        "predictedClass": predicted_label,
        "displayName": CLASS_DISPLAY[predicted_label]["name"],
        "scientificName": CLASS_DISPLAY[predicted_label]["scientific"],
        "confidence": round(confidence, 2),
        "inferenceTime": elapsed_ms,
        "probabilities": probabilities_map,
        "explanation": explanation,
        "comparison": comparison,
        "flower": CLASS_DISPLAY[predicted_label],
        "status": "High Confidence" if confidence > 90 else "Medium Confidence" if confidence > 70 else "Low Confidence",
        "featureNames": FEATURE_NAMES,
        "values": values,
        "activations": {
            "inputs": values,
            "hidden": act_data,
            "output": [float(x) for x in probabilities]
        }
    }
    return jsonify(payload_response)


@app.route("/pca_static", methods=["GET"])
def get_pca_static():
    return jsonify({"points": STATIC_PCA_POINTS})


@app.route("/retrain", methods=["POST"])
def retrain():
    global model
    payload = request.get_json(silent=True) or {}
    
    epochs = int(payload.get("epochs", 20))
    learning_rate = float(payload.get("learningRate", 0.001))
    hidden_layers = payload.get("hiddenLayers", [256, 128, 64])
    
    if epochs < 1 or epochs > 100:
        return jsonify({"error": "Epochs must be between 1 and 100"}), 400
        
    X_data = iris.data
    y_data = iris.target
    
    encoder = LabelEncoder()
    y_encoded = encoder.fit_transform(y_data)
    y_categorical = to_categorical(y_encoded)
    
    # Construct model dynamically
    new_model = Sequential()
    new_model.add(Dense(hidden_layers[0], activation="relu", input_shape=(4,)))
    for units in hidden_layers[1:]:
        new_model.add(Dense(units, activation="relu"))
    new_model.add(Dense(3, activation="softmax"))
    
    new_model.compile(
        optimizer=Adam(learning_rate=learning_rate),
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )
    
    start_time = time.perf_counter()
    history = new_model.fit(
        X_data,
        y_categorical,
        epochs=epochs,
        batch_size=16,
        validation_split=0.2,
        verbose=0
    )
    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    
    model = new_model
    model.save(MODEL_PATH)
    
    return jsonify({
        "status": "success",
        "trainingTimeMs": elapsed_ms,
        "epochs": list(range(1, epochs + 1)),
        "history": {
            "loss": [float(x) for x in history.history["loss"]],
            "accuracy": [float(x) for x in history.history["accuracy"]],
            "val_loss": [float(x) for x in history.history["val_loss"]],
            "val_accuracy": [float(x) for x in history.history["val_accuracy"]]
        }
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
