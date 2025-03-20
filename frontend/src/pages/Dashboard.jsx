"use client";

import React, { useState, useEffect } from "react";
import {
  Grid, Box, Typography, Paper, ToggleButtonGroup, ToggleButton, Select, MenuItem, Button, CircularProgress
} from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Alerts from "../components/Alerts";

const Dashboard = () => {
  const [state, setState] = useState("all");
  const [commodity, setCommodity] = useState("all");
  const [timeframe, setTimeframe] = useState("monthly");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [commodities, setCommodities] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceTrend, setPriceTrend] = useState([]);
  
  
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/commodities");
        const data = await response.json();
        setCommodities(data.commodities);
      } catch (error) {
        console.error("Failed to fetch commodities:", error);
      }
    };
    fetchCommodities();
  }, []);

  const fetchPrediction = async () => {
    if (!selectedCommodity) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/predict?commodity=${selectedCommodity}`);
      const data = await response.json();

      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        throw new Error(data.error || "Failed to fetch prediction");
      }
    } catch (error) {
      setError(error.message);
      setPredictedPrice(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceTrend = async () => {
    if (!selectedCommodity) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/price-trend?commodity=${selectedCommodity}`);
      const data = await response.json();

      if (response.ok) {
        // Convert API response to a format suitable for the Chart component
        const formattedTrend = data.trend.map(item => ({
          date: new Date(item.Date).toISOString().split("T")[0], // Convert to YYYY-MM-DD
          price: item["Retail Price (\u20b9/kg)"]                // Extract price
        }));

        setPriceTrend(formattedTrend);
        console.log("Formatted Trend Data:", formattedTrend);
      } else {
        console.error("Error fetching price trend:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Automatically fetch price trend when selectedCommodity changes
  useEffect(() => {
    if (selectedCommodity) {
      fetchPriceTrend();
    }
  }, [selectedCommodity, timeframe]);

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Market Dashboard
      </Typography>

    {/* Predicted Commodity Prices */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} height={400}>
        <Card title="Predicted Commodity Prices" icon={<GrassIcon color="success" />}>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Commodity
              </Typography>
              <Box mb={4} >
              <Select value={selectedCommodity} onChange={(e) => setSelectedCommodity(e.target.value)} displayEmpty fullWidth>
                <MenuItem value="" disabled>
                  Select a Commodity
                </MenuItem>
                {commodities.map((commodity) => (
                  <MenuItem key={commodity} value={commodity}>
                    {commodity}
                  </MenuItem>
                ))}
              </Select></Box>
            </Box>
          
         
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Button variant="contained" mt={2} color="primary" onClick={fetchPrediction} disabled={!selectedCommodity || loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Get Predicted Price"}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
              {predictedPrice !== null && (
                <Typography variant="h6" fontWeight="bold">
                  Predicted Price: ₹{predictedPrice}/kg
                </Typography>
              )}
            </Box>
          </Card>
         
        </Grid>

  {/* Price Trend Chart with Toggle Buttons */}
  <Grid item xs={12} md={8} height={400}>
  <Paper
    sx={{
      p: 2,
      borderRadius: 3,
      bgcolor: "#e8f5e9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 360,
    }}
  >
    {/* Title & Timeframe Toggle Buttons */}
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        <GrassIcon color="success" sx={{ mr: 1 }} />
        Price Trends (₹/kg)
      </Typography>

      <ToggleButtonGroup
        value={timeframe}
        exclusive
        onChange={(event, newTimeframe) => setTimeframe(newTimeframe)}
        size="small"
      >
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
        <ToggleButton value="yearly">Yearly</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    {/* Chart Component */}
    <Box mb={1} sx={{ width: "100%", flex: 1 }}>
      <Chart data={priceTrend} />
    </Box>
  </Paper>
</Grid>

        {/* AI Suggestions */}
        {/* <Grid item xs={12}>
          <Card title="AI Suggestions" icon={<LightbulbIcon color="warning" />}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "white" }}>
              <Typography variant="body2">
                <strong>Market Analysis:</strong> Monitor price trends for strategic buffer stock release.
              </Typography>
            </Paper>
          </Card>
        </Grid> */}

        {/* Price Alerts */}
        <Grid item xs={12} md={6} width="100%" >
          <Alerts />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
