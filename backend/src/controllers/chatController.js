import mongoose from "mongoose";
import { generateChatReply } from "../services/aiService.js";
import { SUGGESTED_QUESTIONS, COLLEGE_INFO } from "../data/collegeKnowledgeBase.js";
import ChatMessage from "../models/ChatMessage.js";

export const handleChat = async (req, res) => {
  try {
    const { message, history, userId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required and must be non-empty." });
    }

    const { reply, source } = await generateChatReply(message.trim(), history || []);

    // Persist chat to MongoDB Atlas if connected
    if (mongoose.connection.readyState === 1) {
      ChatMessage.create({
        userId: userId || "guest",
        message: message.trim(),
        reply,
        source
      }).catch((dbErr) => {
        console.warn("Failed to persist message to MongoDB Atlas:", dbErr.message);
      });
    }

    return res.status(200).json({
      reply,
      source,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error handling chat request:", error);
    return res.status(500).json({
      reply: "Sorry, something went wrong while processing your request. Please try again.",
      error: error.message
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { userId = "guest", limit = 30 } = req.query;

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ history: [], status: "Database not connected" });
    }

    const history = await ChatMessage.find({ userId })
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 30, 100));

    return res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching chat history from MongoDB:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getSuggestedQuestions = (req, res) => {
  res.status(200).json({
    questions: SUGGESTED_QUESTIONS
  });
};

export const getCollegeInfo = (req, res) => {
  res.status(200).json(COLLEGE_INFO);
};
