import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: "Computer Science & Engineering"
    },
    registerNumber: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "guest"],
      default: "student"
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);
export default User;
