"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
} from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import BalanceIcon from "@mui/icons-material/Balance"
import Card from "../components/Card"
import Chart from "../components/Chart"
import LightbulbIcon from "@mui/icons-material/Lightbulb"

// Buffer stock data
const bufferStocks = [
  { commodity: "Gram", stock: 12000, capacity: 25000, unit: "MT" },
  { commodity: "Tur", stock: 18000, capacity: 20000, unit: "MT" },
  { commodity: "Urad", stock: 15000, capacity: 18000, unit: "MT" },
  { commodity: "Moong", stock: 12000, capacity: 15000, unit: "MT" },
  { commodity: "Masur", stock: 16000, capacity: 20000, unit: "MT" },
  { commodity: "Onion", stock: 35000, capacity: 40000, unit: "MT" },
  { commodity: "Rice ", stock: 23000, capacity: 56000 , unit:"MT"}
]

// Recent stock releases
const recentReleases = [
  {
    id: 1,
    date: "2025-03-10",
    commodity: "Onion",
    quantity: 5000,
    markets: "Delhi, Mumbai, Kolkata",
    impact: -8.5,
  },
  {
    id: 2,
    date: "2025-03-05",
    commodity: "Tur",
    quantity: 2000,
    markets: "Bangalore, Chennai",
    impact: -5.2,
  },
  {
    id: 3,
    date: "2025-02-28",
    commodity: "Gram",
    quantity: 3000,
    markets: "Delhi, Jaipur",
    impact: -3.8,
  },
  {
    id: 4,
    date: "2025-02-20",
    commodity: "Masur",
    quantity: 2500,
    markets: "Mumbai, Pune",
    impact: -4.5,
  },
]

// Interventions history
const interventions = [
  {
    id: 1,
    date: "2025-03-10",
    type: "Stock Release",
    details: "Released 5,000 MT of onions in key markets",
    effectiveness: "High",
  },
  {
    id: 2,
    date: "2025-03-01",
    type: "Import Policy",
    details: "Reduced import duty on pulses from 30% to 10%",
    effectiveness: "Medium",
  },
  {
    id: 3,
    date: "2025-02-15",
    type: "Price Regulation",
    details: "Set maximum retail price for onions at ₹40/kg",
    effectiveness: "Medium",
  },
  {
    id: 4,
    date: "2025-02-01",
    type: "Stock Release",
    details: "Released 3,000 MT of gram in northern markets",
    effectiveness: "High",
  },
]

const BufferStock = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Buffer Stock Management
      </Typography>

      <Grid container spacing={3}>
        {/* Buffer Stock Overview */}
        <Grid item xs={12} md={6}>
          <Card title="Buffer Stock Levels" icon={<InventoryIcon color="primary" />}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {bufferStocks.map((item) => (
                <Paper
                  key={item.commodity}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "white",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {item.commodity}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.stock.toLocaleString()} {item.unit}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(item.stock / item.capacity) * 100}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#e8f5e9",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: item.stock < item.capacity * 0.7 ? "#f44336" : "#4caf50",
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {Math.round((item.stock / item.capacity) * 100)}%
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Card>
        </Grid>

       {/* AI Suggestions */}
       <Grid item xs={12}>
          <Card title="AI Suggestions" icon={<LightbulbIcon color="warning" />}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "white" }}>
              <Typography variant="body2">
                <strong>Market Analysis:</strong> Monitor price trends for strategic buffer stock release.
              </Typography>
            </Paper>
          </Card>
        </Grid>

        {/* Recent Stock Releases */}
        {/* <Grid item xs={12}>
          <Card title="Recent & Upcoming Stock Releases" icon={<LocalShippingIcon color="primary" />}>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "none" }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "#f5f5f5" } }}>
                    <TableCell>Date</TableCell>
                    <TableCell>Commodity</TableCell>
                    <TableCell align="right">Quantity (MT)</TableCell>
                    <TableCell>Target Markets</TableCell>
                    <TableCell align="right">Price Impact (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentReleases.map((row) => (
                    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {new Date(row.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{row.commodity}</TableCell>
                      <TableCell align="right">{row.quantity.toLocaleString()}</TableCell>
                      <TableCell>{row.markets}</TableCell>
                      <TableCell align="right">
                        <Chip label={`${row.impact}%`} size="small" color="success" sx={{ height: 24 }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid> */}

        {/* Price Stabilization Measures */}
        <Grid item xs={12}>
          <Card title="Price Stabilization Measures & Interventions" icon={<BalanceIcon color="primary" />}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="intervention tabs">
                <Tab label="Past 6 Months" />
                <Tab label="Effectiveness Analysis" />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "none" }}>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "#f5f5f5" } }}>
                      <TableCell>Date</TableCell>
                      <TableCell>Intervention Type</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell align="right">Effectiveness</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interventions.map((row) => (
                      <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {new Date(row.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.details}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={row.effectiveness}
                            size="small"
                            color={
                              row.effectiveness === "High"
                                ? "success"
                                : row.effectiveness === "Medium"
                                  ? "warning"
                                  : "error"
                            }
                            sx={{ height: 24 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {tabValue === 1 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" paragraph>
                  <strong>Stock Release Effectiveness:</strong> Analysis of the last 10 stock releases shows an average
                  price reduction of 6.2% within 7 days of intervention. Most effective for onions and pulses.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Import Policy Impact:</strong> Reduction in import duties has shown a delayed effect, with
                  prices stabilizing after 3-4 weeks. Medium effectiveness overall.
                </Typography>
                <Typography variant="body2">
                  <strong>Price Regulation:</strong> Setting maximum retail prices has been effective in urban markets
                  but shows limited impact in rural areas due to enforcement challenges.
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BufferStock

