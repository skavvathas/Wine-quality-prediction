# views.py
from django.http import JsonResponse
from .wine_quality2 import scaler, model, df  # Import your scaler and model
import pandas as pd
from rest_framework import viewsets
from .serializers import WineSerializer
from .models import Wine
from django.views.decorators.csrf import csrf_exempt
import json
import numpy as np
from sklearn.preprocessing import StandardScaler

class WineView(viewsets.ModelViewSet):
    serializer_class = WineSerializer
    queryset = Wine.objects.all()


@csrf_exempt
def predict_wine_quality(request):
    if request.method == 'POST':
        try:
            # Read the JSON data from the request body
            user_input_json = json.loads(request.body.decode('utf-8'))

            feature_names = df.drop(columns=['quality']).columns

            # Create a DataFrame for user input with the same feature names
            user_input_df = pd.DataFrame([user_input_json], columns=feature_names)

            # Standardize user input using the same scaler as used during training
            user_input_scaled = scaler.transform(user_input_df.values)

            # Make predictions
            predicted_quality = model.predict(user_input_scaled)


            # Return the predicted quality as JSON response
            return JsonResponse({'predicted_quality': float(predicted_quality[0][0])})

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
'''
@csrf_exempt
def predict_wine_quality(request):
    if request.method == 'POST':
        # Retrieve user input data from the request
        #user_input = request.POST  # Modify this to match your data format
        user_input = request.POST.getlist('input_field_name')

        print("User input:", user_input)

        # Convert user input to a DataFrame
        # user_input_df = pd.DataFrame([user_input])

        # Standardize user input using the same scaler as used during training
        # user_input_scaled = scaler.transform(user_input_df)

        # Make predictions
        # predicted_quality = model.predict(user_input_scaled)

        # Return the predicted quality as JSON response
        return JsonResponse({'predicted_quality'}, safe=False) #: predicted_quality[0][0]})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@csrf_exempt
def predict_wine_quality(request):
    if request.method == 'POST':
        # Retrieve user input data from the request
        user_input = request.POST.getlist('input_field_name')  # Replace 'input_field_name' with the actual field name

        # Convert the input data into a dictionary or list if necessary
        # For example, if 'input_field_name' contains multiple values, you may need to convert it to a list
        # user_input = list(user_input)

        # Create a dictionary or list with the input data and column names
        input_data = {'column_name_1': user_input}  # Replace 'column_name_1' with your column name

        # Convert the input data to a DataFrame
        user_input_df = pd.DataFrame(input_data)

        # Standardize user input using the same scaler as used during training
        user_input_scaled = scaler.transform(user_input_df)

        # Make predictions
        predicted_quality = model.predict(user_input_scaled)

        # Return the predicted quality as JSON response
        return JsonResponse({'predicted_quality': predicted_quality[0][0]})
    else:
        return JsonResponse({'error': 'Invalid request method'})
'''

