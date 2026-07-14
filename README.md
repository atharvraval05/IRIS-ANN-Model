# Iris Species Classification Workstation (ANN)

This project is an interactive classification workspace designed to identify species of the Iris flower (*Iris setosa*, *Iris versicolor*, and *Iris virginica*) based on anatomical measurements (sepal length, sepal width, petal length, and petal width). It uses an Artificial Neural Network (ANN) built with TensorFlow/Keras.

## Features
- **Multi-Class ANN Classifier**: Fully-connected dense neural network (Input $\rightarrow$ 256 $\rightarrow$ 128 $\rightarrow$ 64 $\rightarrow$ Softmax Output) trained using cross-entropy.
- **Diagnostics Metrics Interface**: Real-time species prediction probability breakdown.
- **Interactive Flask Portal**: Clean, modern interface designed to run inference directly on user-provided sepal and petal inputs.

## Project Structure
```text
├── Iris_ANN.keras        # Trained Keras model weights
├── iris.py               # Model training and validation script
├── requirements.txt      # Execution dependencies
└── iris_app/
    ├── app.py            # Flask server & model inference routes
    ├── templates/
    │   └── index.html    # Interactive client view template
    └── static/
        ├── css/
        │   └── style.css # Stylesheet rules
        └── js/
            └── script.js # Chart.js visualizations & input handlers
```

## Setup & Installation

1. **Clone the Repository**
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Start the Web Application**:
   ```bash
   python iris_app/app.py
   ```
4. Access the workspace in your browser at **http://127.0.0.1:5000**.

## Model Training
To retrain the neural network model on the Iris CSV dataset:
```bash
python iris.py
```
This will evaluate performance metrics and overwrite the pre-trained weights file `Iris_ANN.keras`.
