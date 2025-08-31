from flask import Blueprint, request, jsonify
from app.utils.config import get_lat_lon
from app.services.model_service import generate_random_features, predict_score,predict_project_type,predict_constraint_factor,predict_investment_risk

predict_bp = Blueprint('predict', __name__)
 
@predict_bp.route('/predict_all', methods=['POST'])
def predict_all():
    try:
        data = request.json
        city = data.get("city")
        state = data.get("state")
        country = data.get("country")

        if not city or not state or not country:
            return jsonify({"error": "Please provide city, state, and country"}), 400

        # Get lat & lon
        lat, lon = get_lat_lon(city, state, country)
        if lat is None or lon is None:
            return jsonify({"error": "Location not found"}), 400

        # Generate random features
        features = generate_random_features(lat, lon)

        # Predictions
        suitability_score = predict_score(features)
        recommended_project_type = predict_project_type(features)
        constraint_factor = predict_constraint_factor(features)
        investment_risk = predict_investment_risk(features)

        return jsonify({
            "location": {"latitude": lat, "longitude": lon},
            "features": features,
            "predictions": {
                "overall_suitability_score": suitability_score,
                "recommended_project_type": recommended_project_type,
                "primary_constraint_factor": constraint_factor,
                "investment_risk_profile": investment_risk
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500