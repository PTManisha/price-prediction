from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import xgboost as xgb
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load dataset
DATA_PATH = "data/mock_commodity_prices_2014_2024.csv"
df = pd.read_csv(DATA_PATH)

# Preprocess dataset
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df['Retail Price (₹/kg)'] = pd.to_numeric(df['Retail Price (₹/kg)'], errors='coerce')
df.dropna(subset=['Retail Price (₹/kg)'], inplace=True)

# Convert commodity names to lowercase for uniformity
df["Commodity"] = df["Commodity"].str.lower()

@app.route("/commodities", methods=["GET"])
def get_commodities():
    """Returns all unique commodity names."""
    commodities = sorted(df["Commodity"].unique())
    return jsonify({"commodities": commodities})

@app.route("/predict", methods=["GET"])
def predict_price():
    commodity_name = request.args.get("commodity", "").strip().lower()
    
    if not commodity_name:
        return jsonify({"error": "Commodity name is required"}), 400

    if commodity_name not in df["Commodity"].unique():
        return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

    # Filter commodity data
    commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")
    commodity_data["Days_Since_Start"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

    # Train XGBoost model
    X = commodity_data[['Days_Since_Start']]
    y = commodity_data['Retail Price (₹/kg)']

    model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
    model.fit(X, y)

    today_num = (datetime.datetime.today() - commodity_data["Date"].min()).days
    predicted_price = model.predict(np.array([[today_num]]))[0]

    return jsonify({
        "commodity": commodity_name.capitalize(),
        "predicted_price": round(float(predicted_price), 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
