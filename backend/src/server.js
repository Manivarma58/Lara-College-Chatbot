import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/chat", chatRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Lara College Chatbot API is running",
    endpoints: {
      health: "/api/health",
      chat: "POST /api/chat",
      suggestedQuestions: "/api/chat/suggested",
      collegeInfo: "/api/chat/info"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} is in use, attempting fallback to port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`🚀 Backend server is running on http://localhost:${fallbackPort}`);
    });
  } else {
    console.error("Server error:", err);
  }
});

export default app;
