"use client"

import { useState } from "react"
import { Grid, Box, Typography, Paper, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import GrassIcon from "@mui/icons-material/Grass"
import Card from "../components/Card"
import Chart from "../components/Chart"
import Alerts from "../components/Alerts"

const commodities = [
  { name: "Onion", currentPrice: 35.5, change: 2.5, trend: "up" },
  { name: "Potato", currentPrice: 22.75, change: -1.2, trend: "down" },
  { name: "Gram", currentPrice: 78.3, change: 0.8, trend: "up" },
  { name: "Masur", currentPrice: 92.15, change: -0.5, trend: "down" },
  { name: "Tur", currentPrice: 105.6, change: 3.2, trend: "up" },
]

const Dashboard = () => {
  const [state, setState] = useState("all")
  const [commodity, setCommodity] = useState("all")
  const [timeframe, setTimeframe] = useState("monthly")

  const handleStateChange = (event, newState) => {
    if (newState !== null) {
      setState(newState)
    }
  }

  const handleCommodityChange = (event, newCommodity) => {
    if (newCommodity !== null) {
      setCommodity(newCommodity)
    }
  }

  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe)
    }
  }

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Market Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Filters */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "#e8f5e9",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                State
              </Typography>
              <ToggleButtonGroup
                value={state}
                exclusive
                onChange={handleStateChange}
                size="small"
                sx={{ bgcolor: "white", borderRadius: 2 }}
              >
                <ToggleButton value="all" sx={{ borderRadius: 2 }}>
                  All
                </ToggleButton>
                <ToggleButton value="delhi" sx={{ borderRadius: 2 }}>
                  Delhi
                </ToggleButton>
                <ToggleButton value="maharashtra" sx={{ borderRadius: 2 }}>
                  Maharashtra
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Commodity
              </Typography>
              <ToggleButtonGroup
                value={commodity}
                exclusive
                onChange={handleCommodityChange}
                size="small"
                sx={{ bgcolor: "white", borderRadius: 2 }}
              >
                <ToggleButton value="all" sx={{ borderRadius: 2 }}>
                  All
                </ToggleButton>
                <ToggleButton value="pulses" sx={{ borderRadius: 2 }}>
                  Pulses
                </ToggleButton>
                <ToggleButton value="vegetables" sx={{ borderRadius: 2 }}>
                  Vegetables
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Timeframe
              </Typography>
              <ToggleButtonGroup
                value={timeframe}
                exclusive
                onChange={handleTimeframeChange}
                size="small"
                sx={{ bgcolor: "white", borderRadius: 2 }}
              >
                <ToggleButton value="daily" sx={{ borderRadius: 2 }}>
                  Daily
                </ToggleButton>
                <ToggleButton value="weekly" sx={{ borderRadius: 2 }}>
                  Weekly
                </ToggleButton>
                <ToggleButton value="monthly" sx={{ borderRadius: 2 }}>
                  Monthly
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Current Market Prices */}
        <Grid item xs={12} md={4}>
          <Card title="Current Market Prices" icon={<GrassIcon color="success" />}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {commodities.map((item) => (
                <Paper
                  key={item.name}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      ₹{item.currentPrice}/kg
                    </Typography>
                    <Chip
                      icon={
                        item.trend === "up" ? (
                          <TrendingUpIcon fontSize="small" />
                        ) : (
                          <TrendingDownIcon fontSize="small" />
                        )
                      }
                      label={`${item.change > 0 ? "+" : ""}${item.change}%`}
                      size="small"
                      color={item.trend === "up" ? "error" : "success"}
                      sx={{ height: 24 }}
                    />
                  </Box>
                </Paper>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Price Trend Chart */}
        {/* <Grid item xs={12} md={8}>
          <Chart title="Price Trends (₹/kg)" />
        </Grid> */}

        {/* AI Suggestions */}
        <Grid item xs={12}>
          <Card title="AI Suggestions" icon={<LightbulbIcon color="warning" />}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "white",
              }}
            >
              <Typography variant="body2" paragraph>
                <strong>Market Analysis:</strong> Based on current trends, onion prices are expected to increase by 8%
                in the next 7 days due to supply constraints in major producing regions. Consider releasing 2,000 MT
                from buffer stocks in Delhi, Mumbai, and Kolkata markets to stabilize prices.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Price Stabilization:</strong> Potato prices are showing a downward trend (-1.2%) which aligns
                with seasonal patterns. No intervention is recommended at this time.
              </Typography>
              <Typography variant="body2">
                <strong>Buffer Stock Management:</strong> Current Tur Dal buffer stocks are at 18,000 MT, which is below
                the recommended threshold of 20,000 MT. Consider procurement in the next 14 days to maintain adequate
                stock levels for market interventions.
              </Typography>
            </Paper>
          </Card>
        </Grid>

        {/* Price Alerts */}
        <Grid item xs={12} md={6}>
          <Alerts />
        </Grid>

        {/* Market Volatility */}
        <Grid item xs={12} md={6}>
          <Card title="Market Volatility & Risk Indicator">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {commodities.map((item) => (
                <Paper
                  key={item.name}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.trend === "up" ? "High" : "Low"}
                    size="small"
                    color={item.trend === "up" ? "warning" : "success"}
                    sx={{ height: 24 }}
                  />
                </Paper>
              ))}
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "white",
                  mt: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>Weather Impact:</strong> Delayed monsoon in Maharashtra and Karnataka may affect onion
                  production in the coming months. Monitor closely for potential price volatility.
                </Typography>
              </Paper>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

