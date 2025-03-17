import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Dashboard from "./pages/Dashboard"
import BufferStock from "./pages/BufferStock"
import Chatbot from "./pages/Chatbot"
import Layout from "./components/Layout"

// Custom theme with green colors to match the screenshots
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#8BC34A",
      light: "#AED581",
      dark: "#689F38",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    success: {
      main: "#4CAF50",
    },
    chat: {
      background: "#e8f5e9",
      bubble: "#c8e6c9",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="buffer-stocks" element={<BufferStock />} />
            <Route path="chatbot" element={<Chatbot />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

