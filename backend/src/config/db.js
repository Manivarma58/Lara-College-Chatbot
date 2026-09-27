import dns from "node:dns";
import mongoose from "mongoose";

// Resolve SRV records reliably across Windows and restricted ISP DNS configurations
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("Custom DNS fallback not available, using default system DNS:", dnsErr.message);
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn("⚠️ MONGODB_URI is not defined in environment variables. Database features will be disabled.");
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
