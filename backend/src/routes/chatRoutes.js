import { Router } from "express";
import { handleChat, getSuggestedQuestions, getCollegeInfo, getChatHistory } from "../controllers/chatController.js";

const router = Router();

// Chat endpoint
router.post("/", handleChat);

// Chat history endpoint
router.get("/history", getChatHistory);

// Suggested questions endpoint
router.get("/suggested", getSuggestedQuestions);

// College info endpoint
router.get("/info", getCollegeInfo);

export default router;
