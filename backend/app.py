# from flask_cors import CORS
# import xgboost as xgb
# import datetime
# import pandas as pd
# import numpy as np
# import datetime
# import requests
# from flask import Flask, request, jsonify
# from langchain.document_loaders import DataFrameLoader
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.vectorstores import FAISS
# from langchain.llms import HuggingFaceHub
# from langchain.chains import RetrievalQA
# from langchain.text_splitter import RecursiveCharacterTextSplitter


# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Load dataset
# DATA_PATH = "data/mock_commodity_prices_2014_2024.csv"
# df = pd.read_csv(DATA_PATH)

# # Preprocess dataset
# df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
# df['Retail Price (₹/kg)'] = pd.to_numeric(df['Retail Price (₹/kg)'], errors='coerce')
# df.dropna(subset=['Retail Price (₹/kg)'], inplace=True)

# # Convert commodity names to lowercase for uniformity
# df["Commodity"] = df["Commodity"].str.lower()

# # # Hugging Face API
# # df_text = df.astype(str).apply(lambda x: " | ".join(x), axis=1).tolist()
# # text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
# # docs = text_splitter.create_documents(df_text)

# # embeddings = HuggingFaceEmbeddings()
# # vector_db = FAISS.from_documents(docs, embeddings) 

# # # ✅ Step 3: Load Hugging Face Model for Chat Responses
# # llm = HuggingFaceHub(repo_id="mistralai/Mistral-7B-Instruct", model_kwargs={"temperature": 0.2})
# # qa_chain = RetrievalQA.from_chain_type(llm, retriever=vector_db.as_retriever())

# @app.route("/commodities", methods=["GET"])
# def get_commodities():
#     """Returns all unique commodity names."""
#     commodities = sorted(df["Commodity"].unique())
#     return jsonify({"commodities": commodities})

# @app.route("/predict", methods=["GET"])
# def predict_price():
#     commodity_name = request.args.get("commodity", "").strip().lower()
    
#     if not commodity_name:
#         return jsonify({"error": "Commodity name is required"}), 400

#     if commodity_name not in df["Commodity"].unique():
#         return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

#     # Filter commodity data
#     commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")
#     commodity_data["Days_Since_Start"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

#     # Train XGBoost model
#     X = commodity_data[['Days_Since_Start']]
#     y = commodity_data['Retail Price (₹/kg)']

#     model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
#     model.fit(X, y)

#     today_num = (datetime.datetime.today() - commodity_data["Date"].min()).days
#     predicted_price = model.predict(np.array([[today_num]]))[0]

#     return jsonify({
#         "commodity": commodity_name.capitalize(),
#         "predicted_price": round(float(predicted_price), 2)
#     })


# # @app.route("/chat", methods=["POST"])
# # def chat():
# #     user_query = request.json.get("message", "").strip()

# #     if not user_query:
# #         return jsonify({"error": "Message cannot be empty"}), 400

# #     # ✅ Direct Pandas Queries for Simple Questions
# #     if "highest price" in user_query:
# #         max_price = df["Retail Price (₹/kg)"].max()
# #         return jsonify({"response": f"The highest price recorded is ₹{max_price}/kg."})

# #     if "lowest price" in user_query:
# #         min_price = df["Retail Price (₹/kg)"].min()
# #         return jsonify({"response": f"The lowest price recorded is ₹{min_price}/kg."})

# #     if "average price" in user_query:
# #         avg_price = df["Retail Price (₹/kg)"].mean()
# #         return jsonify({"response": f"The average price is ₹{round(avg_price, 2)}/kg."})

# #     # ✅ Complex Questions → Use AI Model + Document Retrieval
# #     bot_reply = qa_chain.run(user_query)

# #     return jsonify({"response": bot_reply})

# if __name__ == "__main__":
# #     app.run(debug=True)

# import nltk
# import re
# import random
# import string
# import sqlite3
# import pandas as pd
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np
# import datetime
# import xgboost as xgb
# import google.generativeai as genai  # ✅ Google Gemini API


# # # Download NLTK Data
# # nltk.download("punkt")
# # nltk.download("stopwords")


# # 🔹 Initialize Flask
# app = Flask(__name__)
# # CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# # 🔹 Load Dataset
# DATA_PATH = "data/mock_commodity_prices_2014_2024.csv"
# df = pd.read_csv(DATA_PATH)

# # Store in SQLite for Quick Access
# conn = sqlite3.connect("commodity_prices.db", timeout=10, check_same_thread=False)

# df.to_sql("commodity_prices", conn, if_exists="replace", index=False)

# # Stopwords & Tokenizer
# stop_words = set(stopwords.words("english"))


# # 🔹 Preprocess Data
# df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
# df['Retail Price (₹/kg)'] = pd.to_numeric(df['Retail Price (₹/kg)'], errors='coerce')
# df.dropna(subset=['Retail Price (₹/kg)'], inplace=True)
# df["Commodity"] = df["Commodity"].str.lower()

# # # 🔹 Initialize Gemini API
# # genai.configure(api_key="AIzaSyD56wQdgqYAK3cVjNDiiOaPBJn-YFIXJbA")  # Replace with your actual Gemini API Key
# # model = genai.GenerativeModel("gemini-pro")  # Using Gemini-Pro Model

# @app.route("/commodities", methods=["GET"])
# def get_commodities():
#     """Returns all unique commodity names."""
#     commodities = sorted(df["Commodity"].unique())
#     return jsonify({"commodities": commodities})


# @app.route("/price-trend", methods=["GET"])
# def price_trend():
#     commodity_name = request.args.get("commodity", "").strip().lower()
#     timeframe = request.args.get("timeframe", "weekly").strip().lower()

#     if not commodity_name:
#         return jsonify({"error": "Commodity name is required"}), 400

#     if commodity_name not in df["Commodity"].unique():
#         return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

#     commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")

#     today = commodity_data["Date"].max()

#     if timeframe == "weekly":
#         trend_data = commodity_data[commodity_data["Date"] >= today - pd.Timedelta(days=7)]
#     elif timeframe == "monthly":
#         trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("M")).agg({"Date": "max", "Retail Price (₹/kg)": "mean"}).tail(8)
#     elif timeframe == "yearly":
#         trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("Y")).agg({"Date": "max", "Retail Price (₹/kg)": "mean"}).tail(8)
#     else:
#         return jsonify({"error": "Invalid timeframe"}), 400

#     return jsonify({"commodity": commodity_name, "trend": trend_data.to_dict(orient="records")})

# @app.route("/predict", methods=["GET"])
# def predict_price():
#     commodity_name = request.args.get("commodity", "").strip().lower()
    
#     if not commodity_name:
#         return jsonify({"error": "Commodity name is required"}), 400

#     if commodity_name not in df["Commodity"].unique():
#         return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

#     # Filter commodity data
#     commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")
#     commodity_data["Days_Since_Start"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

#     # Train XGBoost model
#     X = commodity_data[['Days_Since_Start']]
#     y = commodity_data['Retail Price (₹/kg)']

#     model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
#     model.fit(X, y)

#     today_num = (datetime.datetime.today() - commodity_data["Date"].min()).days
#     predicted_price = model.predict(np.array([[today_num]]))[0]

#     return jsonify({
#         "commodity": commodity_name.capitalize(),
#         "predicted_price": round(float(predicted_price), 2)
#     })

# # @app.route("/predict", methods=["GET"])
# # def predict_price():
# #     """Predict commodity price using XGBoost."""
# #     commodity_name = request.args.get("commodity", "").strip().lower()

# #     if not commodity_name:
# #         return jsonify({"error": "Commodity name is required"}), 400

# #     if commodity_name not in df["Commodity"].unique():
# #         return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

# #     # 🔹 Filter Commodity Data
# #     commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")

# #     commodity_data["Days_Since"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

# #     # 🔹 Train XGBoost Model
# #     X = commodity_data[['Days_Since_Start']]
# #     y = commodity_data['Retail Price (₹/kg)']

# #     model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
# #     model.fit(X, y)

# #     # Predict for today's date
# #     today = (datetime.datetime.today() - commodity_data["Date"].min()).days
# #     predicted_price = model.predict(np.array([[today]]))[0]

# #     return jsonify({
# #         "commodity": commodity_name.capitalize(),
# #         "predicted_price": round(float(predicted_price), 2)
# #     })

# def preprocess_text(text):
#     """Tokenize text using regex instead of nltk."""
#     tokens = re.findall(r'\b\w+\b', text.lower())  # Extracts words using regex
#     return tokens

# # Generate SQL Query
# def generate_sql_query(user_input):
#     """Generate a SQL-like query based on user input."""
#     tokens = preprocess_text(user_input)

#     if "price" in tokens:
#         return f"SELECT * FROM df WHERE 'price' in df.columns"
#     elif "category" in tokens:
#         return f"SELECT DISTINCT category FROM df"
#     else:
#         return "Invalid query"
# @app.route("/chat", methods=["POST"])
# def chat():
#     """Handle user queries and return Excel-based responses."""
#     user_message = request.json.get("message", "")
#     print("Received Request:", user_message)

#     sql_query = generate_sql_query(user_message)

#     try:
#         if "SELECT *" in sql_query:
#             response_data = df.head(5).to_dict(orient="records")  # ✅ Limit to 10 rows
#             for item in response_data:
#                 if isinstance(item.get("Date"), pd.Timestamp):
#                     item["Date"] = item["Date"].strftime("%Y-%m-%d")
#         elif "DISTINCT category" in sql_query:
#             response_data = df["category"].unique().tolist()
#         else:
#             response_data = {"error": "Invalid query"}

#         return jsonify({"response": response_data})  # ✅ JSON serializable
    
#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == "__main__":
#     app.run(debug=True)


import nltk
import re
import random
import string
import sqlite3
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import datetime
import xgboost as xgb
import google.generativeai as genai  # ✅ Google Gemini API

# 🔹 Initialize Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# 🔹 Load Dataset
DATA_PATH = "data/mock_commodity_prices_2014_2024.csv"
df = pd.read_csv(DATA_PATH)

# Store in SQLite for Quick Access
conn = sqlite3.connect("commodity_prices.db", timeout=10, check_same_thread=False)
df.to_sql("commodity_prices", conn, if_exists="replace", index=False)

# Stopwords & Tokenizer
stop_words = set(stopwords.words("english"))

# 🔹 Preprocess Data
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df['Retail Price (₹/kg)'] = pd.to_numeric(df['Retail Price (₹/kg)'], errors='coerce')
df.dropna(subset=['Retail Price (₹/kg)'], inplace=True)
df["Commodity"] = df["Commodity"].str.lower()

# 🔹 Initialize Gemini API
genai.configure(api_key="AIzaSyA6vP68CePUdybWBZH-Z3bN0H6rNq3q8Ok")  # 🔹 Replace with your actual API Key
model = genai.GenerativeModel("gemini-1.0-pro-latest")  # 🔹 Using Gemini-Pro Model


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
        trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("M")).agg(
            {"Date": "max", "Retail Price (₹/kg)": "mean"}
        ).tail(8)
    elif timeframe == "yearly":
        trend_data = commodity_data.groupby(commodity_data["Date"].dt.to_period("Y")).agg(
            {"Date": "max", "Retail Price (₹/kg)": "mean"}
        ).tail(8)
    else:
        return jsonify({"error": "Invalid timeframe"}), 400

    return jsonify({"commodity": commodity_name, "trend": trend_data.to_dict(orient="records")})


@app.route("/predict", methods=["GET"])
def predict_price():
    """Predict commodity price using XGBoost."""
    commodity_name = request.args.get("commodity", "").strip().lower()

    if not commodity_name:
        return jsonify({"error": "Commodity name is required"}), 400

    if commodity_name not in df["Commodity"].unique():
        return jsonify({"error": f"Commodity '{commodity_name}' not found"}), 400

    # 🔹 Filter Commodity Data
    commodity_data = df[df["Commodity"] == commodity_name].sort_values(by="Date")
    commodity_data["Days_Since_Start"] = (commodity_data["Date"] - commodity_data["Date"].min()).dt.days

    # 🔹 Train XGBoost Model
    X = commodity_data[['Days_Since_Start']]
    y = commodity_data['Retail Price (₹/kg)']

    model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
    model.fit(X, y)

    # Predict for today's date
    today_num = (datetime.datetime.today() - commodity_data["Date"].min()).days
    predicted_price = model.predict(np.array([[today_num]]))[0]

    return jsonify({
        "commodity": commodity_name.capitalize(),
        "predicted_price": round(float(predicted_price), 2)
    })


def preprocess_text(text):
    """Tokenize text using regex instead of nltk."""
    tokens = re.findall(r'\b\w+\b', text.lower())  # Extracts words using regex
    return tokens


# 🔹 Generate SQL Query
def generate_sql_query(user_input):
    """Generate a SQL-like query based on user input."""
    tokens = preprocess_text(user_input)

    if "price" in tokens:
        return f"SELECT * FROM df WHERE 'price' in df.columns"
    elif "category" in tokens:
        return f"SELECT DISTINCT category FROM df"
    else:
        return "Invalid query"


# @app.route("/chat", methods=["POST"])
# def chat():
#     """Handle user queries using Gemini API and return database responses."""
#     user_message = request.json.get("message", "")
#     print("Received Request:", user_message)

#     try:
#         # 🔹 AI Response using Gemini API
#         gemini_response = model.generate_content(user_message).text

#         # 🔹 Database Query Execution
#         sql_query = generate_sql_query(user_message)

#         if "SELECT *" in sql_query:
#             response_data = df.head(5).to_dict(orient="records")  # ✅ Limit to 5 rows
#             for item in response_data:
#                 if isinstance(item.get("Date"), pd.Timestamp):
#                     item["Date"] = item["Date"].strftime("%Y-%m-%d")
#         elif "DISTINCT category" in sql_query:
#             response_data = df["category"].unique().tolist()
#         else:
#             response_data = {"error": "Invalid query"}

#         return jsonify({
#             "ai_response": gemini_response,
#             "database_response": response_data
#         })  # ✅ JSON serializable

#     except Exception as e:
#         return jsonify({"error": str(e)})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"response": "Please enter a valid query."})

    try:
        response = model.generate_content(user_input)  # Call Gemini API
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error processing request.", "error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
