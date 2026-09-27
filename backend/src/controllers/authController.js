import crypto from "crypto";
import User from "../models/User.js";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const register = async (req, res) => {
  try {
    const { email, password, username, department, registerNumber } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const cleanUsername = username?.trim() || normalizedEmail.split("@")[0];
    const newUser = await User.create({
      email: normalizedEmail,
      username: cleanUsername,
      passwordHash: hashPassword(password),
      department: department || "Computer Science & Engineering",
      registerNumber: registerNumber || ""
    });

    const userObj = {
      id: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
      department: newUser.department,
      register_number: newUser.registerNumber,
      user_metadata: {
        username: newUser.username,
        department: newUser.department,
        register_number: newUser.registerNumber
      }
    };

    return res.status(201).json({
      user: userObj,
      token: `token_${newUser._id}`,
      message: "Registration successful"
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: error.message || "Registration failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: "No user found with this email. Please check your credentials or register." });
    }

    if (user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: "Incorrect password. Please try again." });
    }

    const userObj = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      department: user.department,
      register_number: user.registerNumber,
      user_metadata: {
        username: user.username,
        department: user.department,
        register_number: user.registerNumber
      }
    };

    return res.status(200).json({
      user: userObj,
      token: `token_${user._id}`,
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message || "Login failed." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId, username, department, registerNumber } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (username) user.username = username.trim();
    if (department) user.department = department.trim();
    if (registerNumber !== undefined) user.registerNumber = registerNumber.trim();

    await user.save();

    const userObj = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      department: user.department,
      register_number: user.registerNumber,
      user_metadata: {
        username: user.username,
        department: user.department,
        register_number: user.registerNumber
      }
    };

    return res.status(200).json({
      user: userObj,
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: error.message || "Failed to update profile." });
  }
};
