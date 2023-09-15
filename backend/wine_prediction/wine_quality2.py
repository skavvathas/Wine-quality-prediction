#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import warnings
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
import tensorflow as tf
from tensorflow import keras


# In[2]:


df = pd.read_csv("wine_prediction/modified_file.csv")


# In[3]:


df


# In[4]:


characteristics = [
    'volatile acidity', 'citric acid', 'residual sugar', 'chlorides',
    'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH',
    'sulphates', 'alcohol'
]

# Iterate through each characteristic and find the smallest and largest values
for characteristic in characteristics:
    min_value = df[characteristic].min()
    max_value = df[characteristic].max()
    print(f"{characteristic}: Smallest = {min_value}, Largest = {max_value}")


# In[5]:


# Perform one-hot encoding for 'Type' column
df = pd.get_dummies(df, columns=['Type'], drop_first=True)


# In[6]:


# Split data into features (X) and target (y)
X = df.drop(columns=['quality'])
y = df['quality']


# In[7]:


print(X)
print(y)


# In[8]:


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)



# Standardize features (optional but recommended for neural networks)
scaler = StandardScaler(copy=False)
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = keras.Sequential([
    keras.layers.Input(shape=(X_train.shape[1],)),  # Input layer
    keras.layers.Dense(128, activation='relu'),     
    keras.layers.Dropout(0.2),                     
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(1)
])


# In[9]:


from keras.optimizers import Adam
model.compile(
    optimizer=Adam(learning_rate=0.001),  # Use the Adam optimizer
    loss='mean_squared_error',  # Specify the loss function
    metrics=['mse'],  # Optional: specify metrics to monitor during training
)


# In[10]:


# Train the model
history = model.fit(
    X_train, y_train, 
    epochs=500, 
    batch_size=64, 
    validation_split=0.2
)


# In[11]:


y_pred = model.predict(X_test)
print(y_pred)


# In[12]:


mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean squared error (MSE): {mse}')
print(f'R-squared (R2) score: {r2}')


# In[13]:


# Assume user_input is a dictionary or some data structure containing user-supplied input
# Example user input:
user_input = {
    'volatile acidity': 0.3,
    'citric acid': 0.2,
    'residual sugar': 2.5,
    'chlorides': 0.045,
    'free sulfur dioxide': 25,
    'total sulfur dioxide': 100,
    'density': 0.995,
    'pH': 3.4,
    'sulphates': 0.6,
    'alcohol': 11.0,
    'Type_Red Wine': 0,  # For one-hot encoded 'Type' column
    'Type_White Wine': 1,
}


# In[14]:


# Keep track of feature names after one-hot encoding
feature_names = df.drop(columns=['quality']).columns

# Create a DataFrame for user input with the same feature names
user_input_df = pd.DataFrame([user_input], columns=feature_names)

# Standardize user input using the same scaler as used during training
user_input_scaled = scaler.transform(user_input_df.values)

# Make predictions
predicted_quality = model.predict(user_input_scaled)

# Print the predicted quality
print(f"Predicted Quality: {predicted_quality} {predicted_quality[0][0]}")


# In[ ]:




