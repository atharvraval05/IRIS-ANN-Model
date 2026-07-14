#Importing Libraries

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical

# Importing Dataset

url = "https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv"

data = pd.read_csv(url)

# Display Dataset

print(data.head())

# Separating Input and Output

X = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# Encoding Class Labels

encoder = LabelEncoder()
y = encoder.fit_transform(y)

print("\nClass Labels:")
print(dict(zip(encoder.classes_, encoder.transform(encoder.classes_))))

# One Hot Encoding

y = to_categorical(y)

# Splitting Dataset

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Build ANN Model

model = Sequential()

# Input Layer + Hidden Layer 1
model.add(Dense(
    256,
    activation="relu",
    input_shape=(4,)
))

# Hidden Layer 2
model.add(Dense(
    128,
    activation="relu"
))

# Hidden Layer 3
model.add(Dense(
    64,
    activation="relu"
))

# Output Layer

model.add(Dense(
    3,
    activation="softmax"
))

# Compile Model

model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# Model Summary

model.summary()

# Training Model

history = model.fit(
    X_train,
    y_train,
    validation_data=(X_test, y_test),
    epochs=50,
    batch_size=16
)

# Evaluation

loss, accuracy = model.evaluate(X_test, y_test)

print("\nTest Loss :", loss)
print("\nTest Accuracy :", accuracy)

# Saving Model

model.save("Iris_ANN.keras")

print("Model Saved Successfully")

# ==========================================================
# Plot Accuracy
# ==========================================================

plt.figure(figsize=(8,5))

plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")

plt.title("Training Accuracy vs Validation Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()

plt.show()

# ==========================================================
# Plot Loss
# ==========================================================

plt.figure(figsize=(8,5))

plt.plot(history.history["loss"], label="Training Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")

plt.title("Training Loss vs Validation Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()

plt.show()

# ==========================================================
# Predict New Flower
# ==========================================================

sample = np.array([[5.1, 3.5, 1.4, 0.2]])

prediction = model.predict(sample)

predicted_class = np.argmax(prediction)

print("\nPrediction Probabilities :")
print(prediction)

print("\nPredicted Flower :", encoder.inverse_transform([predicted_class])[0])