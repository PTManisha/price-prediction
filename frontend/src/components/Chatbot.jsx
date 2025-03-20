import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Ask me anything about commodity prices, trends, or market analysis.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const handleSend = async () => {
  //   if (input.trim() === "") return;

  //   const userMessage = { id: messages.length + 1, text: input, sender: "user" };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });

  //     const botMessage = {
  //       id: messages.length + 2,
  //       text: response.data.response || "Sorry, I couldn't find an answer.",
  //       sender: "bot"
  //     };

  //     setMessages((prev) => [...prev, botMessage]);
  //   } catch (error) {
  //     console.error("Error fetching response:", error);
  //     setMessages((prev) => [...prev, { id: messages.length + 2, text: "Error fetching response. Please try again.", sender: "bot" }]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSend = async () => {
    if (input.trim() === "") return;
  
    const userMessage = { id: messages.length + 1, text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });
  
      console.log("API Response:", response.data); // ✅ Debugging
  
      let botText = response.data.response || response.data.error || "Sorry, something went wrong.";
  
      // ✅ If response is an array, limit displayed rows to avoid browser crash
      if (Array.isArray(botText)) {
        botText = botText.slice(0, 5).map(obj => JSON.stringify(obj, null, 2)).join("\n\n"); // ✅ Show only 10
      } else if (typeof botText === "object") {
        botText = JSON.stringify(botText, null, 2);
      }
  
      const botMessage = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { id: messages.length + 2, text: "Error fetching response. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
        Commodity Price Chatbot
      </Typography>

      <Paper sx={{ flex: 1, p: 2, mb: 2, borderRadius: 3, bgcolor: "#f5f5f5", overflowY: "auto", height: 400 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            {message.sender === "bot" && (
              <Avatar sx={{ bgcolor: "#4CAF50", width: 32, height: 32, mr: 1 }}>
                <SmartToyIcon />
              </Avatar>
            )}
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9",
                color: message.sender === "user" ? "white" : "inherit",
                maxWidth: "70%",
                wordBreak: "break-word"
              }}
            >
              <Typography variant="body2">{message.text}</Typography>
            </Paper>
            {message.sender === "user" && (
              <Avatar sx={{ bgcolor: "#81C784", width: 32, height: 32, ml: 1 }}>
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Ask about prices, trends, or predictions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent new line in input field
              handleSend();
            }
          }}
          disabled={loading}
        />
        <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || loading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatbotComponent;


// import { useState, useRef, useEffect } from "react";
// import { Box, TextField, IconButton, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import axios from "axios";

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! Ask me anything about commodity prices, trends, or market analysis.", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const userMessage = { id: messages.length + 1, text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY",
//         { contents: [{ parts: [{ text: input }] }] }
//       );

//       const botMessage = {
//         id: messages.length + 2,
//         text: response.data.candidates[0].content.parts[0].text,
//         sender: "bot"
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { id: messages.length + 2, text: "Error fetching response.", sender: "bot" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2, maxWidth: 600, mx: "auto" }}>
//       <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
//         Commodity Price Chatbot
//       </Typography>

//       <Paper sx={{ flex: 1, p: 2, mb: 2, borderRadius: 3, bgcolor: "#f5f5f5", overflowY: "auto", height: 400 }}>
//         {messages.map((message) => (
//           <Box
//             key={message.id}
//             sx={{
//               display: "flex",
//               justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
//               mb: 2,
//             }}
//           >
//             {message.sender === "bot" && (
//               <Avatar sx={{ bgcolor: "#4CAF50", width: 32, height: 32, mr: 1 }}>
//                 <SmartToyIcon />
//               </Avatar>
//             )}
//             <Paper
//               sx={{
//                 p: 1.5,
//                 borderRadius: 3,
//                 bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9",
//                 color: message.sender === "user" ? "white" : "inherit",
//                 maxWidth: "70%",
//               }}
//             >
//               <Typography variant="body2">{message.text}</Typography>
//             </Paper>
//             {message.sender === "user" && (
//               <Avatar sx={{ bgcolor: "#81C784", width: 32, height: 32, ml: 1 }}>
//                 <PersonIcon />
//               </Avatar>
//             )}
//           </Box>
//         ))}
//         {loading && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
//             <CircularProgress size={24} />
//           </Box>
//         )}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Box sx={{ display: "flex", gap: 1 }}>
//         <TextField
//           fullWidth
//           placeholder="Ask about prices, trends, or predictions..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSend()}
//         />
//         <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || loading}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default ChatbotComponent;



// import { useState, useRef, useEffect } from "react";
// import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import axios from "axios";

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! Ask me anything about commodity prices, trends, or market analysis.", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const userMessage = { id: messages.length + 1, text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });
//       const botMessage = { id: messages.length + 2, text: response.data.response, sender: "bot" };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { id: messages.length + 2, text: "Error fetching response.", sender: "bot" }]);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>Commodity Price Chatbot</Typography>

//       <Paper sx={{ flex: 1, p: 2, mb: 2, borderRadius: 3, bgcolor: "#f5f5f5", overflow: "auto" }}>
//         {messages.map((message) => (
//           <Box key={message.id} sx={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start", mb: 2 }}>
//             {message.sender === "bot" && <Avatar sx={{ bgcolor: "#4CAF50", width: 32, height: 32, mr: 1 }}><SmartToyIcon /></Avatar>}
//             <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9", color: message.sender === "user" ? "white" : "inherit" }}>
//               <Typography variant="body2">{message.text}</Typography>
//             </Paper>
//             {message.sender === "user" && <Avatar sx={{ bgcolor: "#81C784", width: 32, height: 32, ml: 1 }}><PersonIcon /></Avatar>}
//           </Box>
//         ))}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Box sx={{ display: "flex", gap: 1 }}>
//         <TextField fullWidth placeholder="Ask about prices, trends, or predictions..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} />
//         <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}><SendIcon /></IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default ChatbotComponent;




// import { useState, useRef, useEffect } from "react";
// import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import axios from "axios";

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! Ask me about commodity prices, trends, or anything!", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const userMessage = { id: messages.length + 1, text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/chat", { message: input });
//       const botMessage = { id: messages.length + 2, text: response.data.response, sender: "bot" };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { id: messages.length + 2, text: "Error connecting to AI.", sender: "bot" }]);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>AI Chatbot</Typography>

//       <Paper sx={{ flex: 1, p: 2, mb: 2, borderRadius: 3, bgcolor: "#f5f5f5", overflow: "auto" }}>
//         {messages.map((message) => (
//           <Box key={message.id} sx={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start", mb: 2 }}>
//             {message.sender === "bot" && <Avatar sx={{ bgcolor: "#4CAF50", width: 32, height: 32, mr: 1 }}><SmartToyIcon /></Avatar>}
//             <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9", color: message.sender === "user" ? "white" : "inherit" }}>
//               <Typography variant="body2">{message.text}</Typography>
//             </Paper>
//             {message.sender === "user" && <Avatar sx={{ bgcolor: "#81C784", width: 32, height: 32, ml: 1 }}><PersonIcon /></Avatar>}
//           </Box>
//         ))}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Box sx={{ display: "flex", gap: 1 }}>
//         <TextField fullWidth placeholder="Ask about prices, trends, or predictions..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} />
//         <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}><SendIcon /></IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default ChatbotComponent;




// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material"
// import SendIcon from "@mui/icons-material/Send"
// import SmartToyIcon from "@mui/icons-material/SmartToy"
// import PersonIcon from "@mui/icons-material/Person"

// const API_URL = "http://127.0.0.1:5000/analyze"

// const initialMessages = [
//   {
//     id: 1,
//     text: "Hello! I'm your agricultural price prediction assistant. You can ask me about highest price, lowest price, average price, or price trends.",
//     sender: "bot",
//   },
// ]

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState(initialMessages)
//   const [input, setInput] = useState("")
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const handleSend = async () => {
//     if (input.trim() === "") return

//     // Add user message
//     const userMessage = {
//       id: messages.length + 1,
//       text: input,
//       sender: "user",
//     }
//     setMessages((prev) => [...prev, userMessage])
//     setInput("")

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: input }),
//       })
//       const data = await response.json()

//       const botMessage = {
//         id: messages.length + 2,
//         text: data.response,
//         sender: "bot",
//       }

//       setMessages((prev) => [...prev, botMessage])
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error)
//       const errorMessage = {
//         id: messages.length + 2,
//         text: "Sorry, I'm having trouble processing your request.",
//         sender: "bot",
//       }
//       setMessages((prev) => [...prev, errorMessage])
//     }
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend()
//     }
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         AI Chatbot
//       </Typography>

//       <Paper
//         elevation={0}
//         sx={{
//           flex: 1,
//           p: 2,
//           mb: 2,
//           borderRadius: 3,
//           bgcolor: "#f5f5f5",
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {messages.map((message) => (
//           <Box
//             key={message.id}
//             sx={{
//               display: "flex",
//               justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
//               mb: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", maxWidth: "75%" }}>
//               {message.sender === "bot" && (
//                 <Avatar
//                   sx={{
//                     bgcolor: "#4CAF50",
//                     width: 32,
//                     height: 32,
//                     mr: 1,
//                     alignSelf: "flex-end",
//                     mb: 0.5,
//                   }}
//                 >
//                   <SmartToyIcon sx={{ fontSize: 18 }} />
//                 </Avatar>
//               )}

//               <Box>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 1.5,
//                     borderRadius: 3,
//                     borderTopLeftRadius: message.sender === "bot" ? 0 : 3,
//                     borderTopRightRadius: message.sender === "user" ? 0 : 3,
//                     bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9",
//                     color: message.sender === "user" ? "white" : "inherit",
//                   }}
//                 >
//                   <Typography variant="body2">{message.text}</Typography>
//                 </Paper>
//               </Box>

//               {message.sender === "user" && (
//                 <Avatar
//                   sx={{
//                     bgcolor: "#81C784",
//                     width: 32,
//                     height: 32,
//                     ml: 1,
//                     alignSelf: "flex-end",
//                     mb: 0.5,
//                   }}
//                 >
//                   <PersonIcon sx={{ fontSize: 18 }} />
//                 </Avatar>
//               )}
//             </Box>
//           </Box>
//         ))}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Box sx={{ display: "flex", gap: 1 }}>
//         <TextField
//           fullWidth
//           placeholder="Ask about highest price, lowest price, average price, or trends..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           variant="outlined"
//           size="small"
//         />
//         <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   )
// }

// export default ChatbotComponent



// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material";
// // import SendIcon from "@mui/icons-material/Send";
// // import SmartToyIcon from "@mui/icons-material/SmartToy";
// // import PersonIcon from "@mui/icons-material/Person";

// // const initialMessages = [
// //   {
// //     id: 1,
// //     text: "Hello! I'm your agricultural price prediction assistant. Ask me about commodity prices!",
// //     sender: "bot",
// //   },
// // ];

// // const ChatbotComponent = () => {
// //   const [messages, setMessages] = useState(initialMessages);
// //   const [input, setInput] = useState("");
// //   const messagesEndRef = useRef(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const handleSend = async () => {
// //     if (input.trim() === "") return;

// //     // Add user message
// //     const userMessage = {
// //       id: messages.length + 1,
// //       text: input,
// //       sender: "user",
// //     };

// //     setMessages((prevMessages) => [...prevMessages, userMessage]);
// //     setInput("");

// //     try {
// //       const res = await axios.post("http://127.0.0.1:5000/query", { query: input });
// //       const botMessage = {
// //         id: messages.length + 2,
// //         text: res.data.response,
// //         sender: "bot",
// //       };
// //       setMessages((prevMessages) => [...prevMessages, botMessage]);
// //     } catch (error) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: messages.length + 2, text: "Error processing query.", sender: "bot" },
// //       ]);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       handleSend();
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
// //       <Typography variant="h6" fontWeight="bold" mb={2}>
// //         AI Chatbot
// //       </Typography>

// //       <Paper
// //         elevation={0}
// //         sx={{
// //           flex: 1,
// //           p: 2,
// //           mb: 2,
// //           borderRadius: 3,
// //           bgcolor: "#f5f5f5",
// //           overflow: "auto",
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         {messages.map((message) => (
// //           <Box
// //             key={message.id}
// //             sx={{
// //               display: "flex",
// //               justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
// //               mb: 2,
// //             }}
// //           >
// //             <Box sx={{ display: "flex", maxWidth: "75%" }}>
// //               {message.sender === "bot" && (
// //                 <Avatar sx={{ bgcolor: "#4CAF50", width: 32, height: 32, mr: 1 }}>
// //                   <SmartToyIcon />
// //                 </Avatar>
// //               )}

// //               <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9", color: message.sender === "user" ? "white" : "inherit" }}>
// //                 <Typography>{message.text}</Typography>
// //               </Paper>
// //             </Box>
// //           </Box>
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </Paper>

// //       <Box sx={{ display: "flex", gap: 1 }}>
// //         <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask about commodity prices..." />
// //         <IconButton color="primary" onClick={handleSend}>
// //           <SendIcon />
// //         </IconButton>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ChatbotComponent;





// // // "use client"

// // // import { useState, useRef, useEffect } from "react"
// // // import { Box, TextField, IconButton, Typography, Paper, Avatar } from "@mui/material"
// // // import SendIcon from "@mui/icons-material/Send"
// // // import SmartToyIcon from "@mui/icons-material/SmartToy"
// // // import PersonIcon from "@mui/icons-material/Person"

// // // const initialMessages = [
// // //   {
// // //     id: 1,
// // //     text: "Hello! I'm your agricultural price prediction assistant. How can I help you today?",
// // //     sender: "bot",
// // //   },
// // // ]

// // // const ChatbotComponent = () => {
// // //   const [messages, setMessages] = useState(initialMessages)
// // //   const [input, setInput] = useState("")
// // //   const messagesEndRef = useRef(null)

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
// // //   }

// // //   useEffect(() => {
// // //     scrollToBottom()
// // //   }, [messages])

// // //   const handleSend = () => {
// // //     if (input.trim() === "") return

// // //     // Add user message
// // //     const userMessage = {
// // //       id: messages.length + 1,
// // //       text: input,
// // //       sender: "user",
// // //     }

// // //     setMessages([...messages, userMessage])
// // //     setInput("")

// // //     // Simulate bot response
// // //     setTimeout(() => {
// // //       const botResponses = {
// // //         price:
// // //           "Based on our AI models, onion prices are expected to increase by 8% in the next 7 days due to supply constraints in major producing regions.",
// // //         trend:
// // //           "The seasonal trend for potatoes shows prices typically decrease in March-April as the new harvest reaches markets.",
// // //         stock: "Current buffer stock levels: Onion: 35,000 MT, Potato: 25,000 MT, Tur: 18,000 MT, Gram: 22,000 MT.",
// // //         intervention:
// // //           "The last market intervention was on March 10, 2025, when 5,000 MT of onions were released from buffer stocks in Delhi, Mumbai, and Kolkata markets.",
// // //       }

// // //       let botReply =
// // //         "I'm not sure about that. Could you ask about price trends, buffer stocks, or market interventions?"

// // //       // Simple keyword matching
// // //       for (const [keyword, response] of Object.entries(botResponses)) {
// // //         if (input.toLowerCase().includes(keyword)) {
// // //           botReply = response
// // //           break
// // //         }
// // //       }

// // //       const botMessage = {
// // //         id: messages.length + 2,
// // //         text: botReply,
// // //         sender: "bot",
// // //       }

// // //       setMessages((prevMessages) => [...prevMessages, botMessage])
// // //     }, 1000)
// // //   }

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === "Enter") {
// // //       handleSend()
// // //     }
// // //   }

// // //   return (
// // //     <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
// // //       <Typography variant="h6" fontWeight="bold" mb={2}>
// // //         AI Chatbot
// // //       </Typography>

// // //       <Paper
// // //         elevation={0}
// // //         sx={{
// // //           flex: 1,
// // //           p: 2,
// // //           mb: 2,
// // //           borderRadius: 3,
// // //           bgcolor: "#f5f5f5",
// // //           overflow: "auto",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //         }}
// // //       >
// // //         {messages.map((message) => (
// // //           <Box
// // //             key={message.id}
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
// // //               mb: 2,
// // //             }}
// // //           >
// // //             <Box sx={{ display: "flex", maxWidth: "75%" }}>
// // //               {message.sender === "bot" && (
// // //                 <Avatar
// // //                   sx={{
// // //                     bgcolor: "#4CAF50",
// // //                     width: 32,
// // //                     height: 32,
// // //                     mr: 1,
// // //                     alignSelf: "flex-end",
// // //                     mb: 0.5,
// // //                   }}
// // //                 >
// // //                   <SmartToyIcon sx={{ fontSize: 18 }} />
// // //                 </Avatar>
// // //               )}

// // //               <Box>
// // //                 <Paper
// // //                   elevation={0}
// // //                   sx={{
// // //                     p: 1.5,
// // //                     borderRadius: 3,
// // //                     borderTopLeftRadius: message.sender === "bot" ? 0 : 3,
// // //                     borderTopRightRadius: message.sender === "user" ? 0 : 3,
// // //                     bgcolor: message.sender === "user" ? "#4CAF50" : "#e8f5e9",
// // //                     color: message.sender === "user" ? "white" : "inherit",
// // //                   }}
// // //                 >
// // //                   <Typography variant="body2">{message.text}</Typography>
// // //                 </Paper>
// // //               </Box>

// // //               {message.sender === "user" && (
// // //                 <Avatar
// // //                   sx={{
// // //                     bgcolor: "#81C784",
// // //                     width: 32,
// // //                     height: 32,
// // //                     ml: 1,
// // //                     alignSelf: "flex-end",
// // //                     mb: 0.5,
// // //                   }}
// // //                 >
// // //                   <PersonIcon sx={{ fontSize: 18 }} />
// // //                 </Avatar>
// // //               )}
// // //             </Box>
// // //           </Box>
// // //         ))}
// // //         <div ref={messagesEndRef} />
// // //       </Paper>

// // //       <Box sx={{ display: "flex", gap: 1 }}>
// // //         <TextField
// // //           fullWidth
// // //           placeholder="Ask about price trends, buffer stocks, or market interventions..."
// // //           value={input}
// // //           onChange={(e) => setInput(e.target.value)}
// // //           onKeyPress={handleKeyPress}
// // //           variant="outlined"
// // //           size="small"
// // //           sx={{
// // //             "& .MuiOutlinedInput-root": {
// // //               borderRadius: 3,
// // //               bgcolor: "white",
// // //             },
// // //           }}
// // //         />
// // //         <IconButton
// // //           color="primary"
// // //           onClick={handleSend}
// // //           disabled={!input.trim()}
// // //           sx={{
// // //             bgcolor: "#4CAF50",
// // //             color: "white",
// // //             "&:hover": { bgcolor: "#388E3C" },
// // //             "&.Mui-disabled": { bgcolor: "#C8E6C9", color: "#A5D6A7" },
// // //           }}
// // //         >
// // //           <SendIcon />
// // //         </IconButton>
// // //       </Box>
// // //     </Box>
// // //   )
// // // }

// // // export default ChatbotComponent

