# AI-ML Based Price Prediction for Agri-Horticultural Commodities

This project aims to develop an AI-ML based model for predicting the prices of essential agri-horticultural commodities such as pulses and vegetables (onion, potato, wheat, rice, etc.). The system helps the Department of Consumer Affairs analyze price trends and optimize buffer stock release decisions.

## Project Structure

The project is organized into three main folders:

- **frontend**: React + Vite application with Material UI
- **backend**: Flask API with MongoDB integration and ML models
- **database**: MongoDB schemas and initialization scripts

## Features

1. **Dashboard**
   - Current Market Prices
   - Price Forecast & Trends
   - Market Volatility & Risk Indicator
   - Alerts Section

2. **Buffer Stocks Page**
   - Overview of Buffer Stock Levels
   - Recent & Upcoming Stock Releases
   - Price Stabilization Measures & Interventions

3. **AI Chatbot**
   - Suggests insights and helps users with price trends

## Tech Stack

### Frontend
- React + Vite
- Material UI
- Recharts for data visualization

### Backend
- Flask/FastAPI
- MongoDB Cloud
- Machine Learning Models (LSTM, XGBoost)

### Data Sources
- Current Market Price: DCA - CEDA
- Price Deviation from Seasonal Average: Data.gov.in
- Supply Side (Stock Levels in Buffer Storage): FCI
- Crop Production Estimates: DES Agri
- Inflation and Economic Indicators: RBI

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/price-prediction-project.git
   cd price-prediction-project

