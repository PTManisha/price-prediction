"use client"

import { useState, useRef, useEffect } from "react"
import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"

const initialMessages = [
  {
    id: 1,
    text: "Hello! I'm your agricultural price prediction assistant. How can I help you today?",
    sender: "bot",
  },
]

const ChatbotComponent = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        price:
          "Based on our AI models, onion prices are expected to increase by 8% in the next 7 days due to supply constraints in major producing regions.",
        trend:
          "The seasonal trend for potatoes shows prices typically decrease in March-April as the new harvest reaches markets.",
        stock: "Current buffer stock levels: Onion: 35,000 MT, Potato: 25,000 MT, Tur: 18,000 MT, Gram: 22,000 MT.",
        intervention:
          "The last market intervention was on March 10, 2025, when 5,000 MT of onions were released from buffer stocks in Delhi, Mumbai, and Kolkata markets.",
      }

      let botReply =
        "I'm not sure about that. Could you ask about price trends, buffer stocks, or market interventions?"

      // Simple keyword matching
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          botReply = response
          break
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: botReply,
        sender: "bot",
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        AI Chatbot
      </Typography>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: 2,
          mb: 2,
          borderRadius: 3,
          bgcolor: "#f5f5f5",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", maxWidth: "75%" }}>
              {message.sender === "bot" && (
                <Avatar
                  sx={{
                    bgcolor: "#4CAF50",
                    width: 32,
                    height: 32,
                    mr: 1,
                    alignSelf: "flex-end",
                    mb: 0.5,
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
              )}

              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    borderTopLeftRadius: message.sender === "bot" ? 0 : 3,
                    borderTopRightRadius: message.sender === "user" ? 0 : 3,
                    bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9",
                    color: message.sender === "user" ? "white" : "inherit",
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                </Paper>
              </Box>

              {message.sender === "user" && (
                <Avatar
                  sx={{
                    bgcolor: "#81C784",
                    width: 32,
                    height: 32,
                    ml: 1,
                    alignSelf: "flex-end",
                    mb: 0.5,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 18 }} />
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Ask about price trends, buffer stocks, or market interventions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "white",
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
          sx={{
            bgcolor: "#4CAF50",
            color: "white",
            "&:hover": { bgcolor: "#388E3C" },
            "&.Mui-disabled": { bgcolor: "#C8E6C9", color: "#A5D6A7" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatbotComponent

