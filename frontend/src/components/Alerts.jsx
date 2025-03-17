import { Box, Typography, Chip, Stack } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import WarningIcon from "@mui/icons-material/Warning"
import Card from "./Card"

const alerts = [
  {
    id: 1,
    commodity: "Onion",
    message: "Expected price increase of 8% in the next 7 days",
    type: "increase",
    severity: "warning",
  },
  {
    id: 2,
    commodity: "Potato",
    message: "Expected price decrease of 5% in the next 7 days",
    type: "decrease",
    severity: "info",
  },
  {
    id: 3,
    commodity: "Tur Dal",
    message: "Price volatility expected due to supply constraints",
    type: "warning",
    severity: "error",
  },
]

const getAlertIcon = (type) => {
  switch (type) {
    case "increase":
      return <TrendingUpIcon color="error" />
    case "decrease":
      return <TrendingDownIcon color="success" />
    case "warning":
      return <WarningIcon color="warning" />
    default:
      return null
  }
}

const getAlertColor = (severity) => {
  switch (severity) {
    case "error":
      return "error"
    case "warning":
      return "warning"
    case "info":
      return "info"
    default:
      return "default"
  }
}

const Alerts = () => {
  return (
    <Card title="Price Alerts" icon={<WarningIcon color="warning" />}>
      <Stack spacing={2}>
        {alerts.map((alert) => (
          <Box
            key={alert.id}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Box sx={{ pt: 0.5 }}>{getAlertIcon(alert.type)}</Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {alert.commodity}
                </Typography>
                <Chip label={alert.type} size="small" color={getAlertColor(alert.severity)} sx={{ height: 20 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {alert.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export default Alerts

