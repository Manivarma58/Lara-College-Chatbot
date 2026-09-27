import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "guest",
      index: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    reply: {
      type: String,
      required: true
    },
    source: {
      type: String,
      enum: ["ai", "knowledge-base", "fallback"],
      default: "knowledge-base"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export default ChatMessage;
