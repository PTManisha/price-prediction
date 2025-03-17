// Base API URL
const API_BASE_URL = "http://localhost:5000/api"

// Fetch current market prices
export const fetchMarketPrices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/prices/current`)
    if (!response.ok) {
      throw new Error("Failed to fetch market prices")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching market prices:", error)
    throw error
  }
}

// Fetch price forecasts
export const fetchPriceForecast = async (commodity, days) => {
  try {
    const response = await fetch(`${API_BASE_URL}/prices/forecast?commodity=${commodity}&days=${days}`)
    if (!response.ok) {
      throw new Error("Failed to fetch price forecast")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching price forecast:", error)
    throw error
  }
}

// Fetch buffer stock levels
export const fetchBufferStocks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/buffer`)
    if (!response.ok) {
      throw new Error("Failed to fetch buffer stocks")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching buffer stocks:", error)
    throw error
  }
}

// Fetch stock releases
export const fetchStockReleases = async (months = 6) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/releases?months=${months}`)
    if (!response.ok) {
      throw new Error("Failed to fetch stock releases")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching stock releases:", error)
    throw error
  }
}

// Fetch price alerts
export const fetchPriceAlerts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts`)
    if (!response.ok) {
      throw new Error("Failed to fetch price alerts")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching price alerts:", error)
    throw error
  }
}

// Get chatbot response
export const getChatbotResponse = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
    if (!response.ok) {
      throw new Error("Failed to get chatbot response")
    }
    return await response.json()
  } catch (error) {
    console.error("Error getting chatbot response:", error)
    throw error
  }
}

