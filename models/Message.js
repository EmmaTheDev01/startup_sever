import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
    },
    chatbotResponse: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // Adjust based on your User model
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
