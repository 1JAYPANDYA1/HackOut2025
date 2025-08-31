# import pickle
# import numpy as np

# MODEL_PATH = "models/model.pkl"

# def load_model():
#     with open(MODEL_PATH, "rb") as f:
#         model = pickle.load(f)
#     return model

# def predict(model, input_data):
#     arr = np.array(input_data).reshape(1, -1)
#     return model.predict(arr).tolist()
import joblib
import random
import numpy as np

# Load your model
suitability_model = joblib.load("models/Overall_suitability_model.pkl")
project_type_model = joblib.load("models/recommended_project_type_model.pkl")
constraint_model = joblib.load("models/constraint_model.pkl")
investment_risk_model = joblib.load("models/investment_risk_model.pkl")

# Your feature columns (excluding target)
FEATURE_COLUMNS = [
    "Latitude",
    "Longitude",
    "Renewable_Energy_Potential_Score",
    "Proximity_to_Water_Source_km",
    "Existing_Infrastructure_Proximity_km",
    "Proximity_to_Demand_Centers_km",
    "Land_Cost_USD_per_sq_m",
    "Transportation_Accessibility_Score",
    "Geological_Suitability_for_Storage_Score"
]
RISK_FEATURE_COLUMNS = [
    "Renewable_Energy_Potential_Score",
    "Proximity_to_Water_Source_km",
    "Existing_Infrastructure_Proximity_km",
    "Proximity_to_Demand_Centers_km",
    "Land_Cost_USD_per_sq_m",
    "Transportation_Accessibility_Score",
    "Geological_Suitability_for_Storage_Score"
]
def generate_random_features(lat, lon):
    data = {
        "Latitude": lat,
        "Longitude": lon,
        "Renewable_Energy_Potential_Score": random.uniform(0, 1),
        "Proximity_to_Water_Source_km": random.uniform(0, 1),
        "Existing_Infrastructure_Proximity_km": random.uniform(0, 1),
        "Proximity_to_Demand_Centers_km": random.uniform(0, 1),
        "Land_Cost_USD_per_sq_m": random.uniform(0, 1),
        "Transportation_Accessibility_Score": random.uniform(0, 1),
        "Geological_Suitability_for_Storage_Score": random.uniform(0, 1)
    }
    return data

def predict_score(data):
    X = np.array([data[col] for col in FEATURE_COLUMNS]).reshape(1, -1)
    prediction = suitability_model.predict(X)[0]
    return prediction

def predict_project_type(data):
    X = np.array([data[col] for col in FEATURE_COLUMNS]).reshape(1, -1)
    prediction = project_type_model.predict(X)[0]
    return prediction

def predict_constraint_factor(data):
    X = np.array([data[col] for col in FEATURE_COLUMNS]).reshape(1, -1)
    prediction= constraint_model.predict(X)[0]
    return prediction

def predict_investment_risk(data):
    X = np.array([data[col] for col in RISK_FEATURE_COLUMNS]).reshape(1, -1)
    return investment_risk_model.predict(X)[0]