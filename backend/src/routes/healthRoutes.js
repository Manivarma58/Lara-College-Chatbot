import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (req, res) => {
  const dbStatus = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  res.status(200).json({
    status: "ok",
    service: "Lara College Chatbot Backend API",
    database: dbStatus[mongoose.connection.readyState] || "unknown",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
