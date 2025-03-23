"use client"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import InventoryIcon from "@mui/icons-material/Inventory"
import ChatIcon from "@mui/icons-material/Chat"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "Buffer Stocks",
      icon: <InventoryIcon />,
      path: "/buffer-stocks",
    },
    {
      text: "Chatbot",
      icon: <ChatIcon />,
      path: "/chatbot",
    },
  ]

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#8BC34A",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "white", color: "#4CAF50" }}>A</Avatar>
        <Typography variant="h6" fontWeight="bold">
          AGRICAST
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: location.pathname === item.path ? "rgba(255, 255, 255, 0.2)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
{/* 
      <Stack direction="row" spacing={1} sx={{ p: 2 }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            flex: 1,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
          }}
        >
          State
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            flex: 1,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
          }}
        >
          Logout
        </Button>
      </Stack> */}
    </Box>
  )
}

export default Sidebar