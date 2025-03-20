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


@app.route("/price-trend", methods=["GET"])
def price_trend():
    commodity_name = request.args.get("commodity", "").strip().lower()
    timeframe = request.args.get("timeframe", "weekly").strip().lower()

    if not commodity_name:
        return jsonify({"error": "Commodity name is required"}), 400

    if commodity_name not in df["Commodity"].unique():
        return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

    commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")

    today = commodity_data["Date"].max()

    if timeframe == "weekly":
        trend_data = commodity_data[commodity_data["Date"] >= today - pd.Timedelta(days=7)]
    elif timeframe == "monthly":
        trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("M")).agg({"Date": "max", "Retail Price (₹/kg)": "mean"}).tail(8)
    elif timeframe == "yearly":
        trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("Y")).agg({"Date": "max", "Retail Price (₹/kg)": "mean"}).tail(8)
    else:
        return jsonify({"error": "Invalid timeframe"}), 400

    return jsonify({"commodity": commodity_name, "trend": trend_data.to_dict(orient="records")})


@app.route("/predict", methods=["GET"])
def predict_price():
    """
    Predicts the future price of a given commodity based on historical data.
    """
    commodity_name = request.args.get("commodity", "").strip().lower()
    
    if not commodity_name:
        return jsonify({"error": "Commodity name is required"}), 400

    if commodity_name not in df["Commodity"].unique():
        return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

    # Filter commodity data
    commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")

    commodity_data["Days_Since"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

    # Train model
    X = commodity_data[["Days_Since"]]
    y = commodity_data["Retail Price (₹/kg)"]

    model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
    model.fit(X, y)

    # Predict for today's date
    today = (datetime.datetime.today() - commodity_data["Date"].min()).days
    predicted_price = model.predict(np.array([[today]]))[0]

    return jsonify({"commodity": commodity_name, "predicted_price": round(float(predicted_price), 2)})


if __name__ == "__main__":
    app.run(debug=True)
