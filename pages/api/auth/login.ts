import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/userSchema"; // Adjust path to your schema
import dbConnect from "@/config/db"; // Your DB connection utility
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { phoneNumber, password } = req.body.formData;

  try {
    // Find user by email
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "Please enter the valid credentials" });
    }

    // Validate password
    const customSalt: string = process.env.MY_SECRET_PHRASE || "";
    const isPasswordValid = await bcrypt.compare(customSalt + password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid phoneNumber or password" });
    }

    // Update last login time and IP address
    const currentTime = new Date();
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";

    user.lastLogin = currentTime; // Update lastLogin field
    user.loginHistory = user.loginHistory || []; // Ensure it's initialized
    // Get last login details (if available)
    const lastLoginIndex = user.loginHistory.length - 1;
    const previousLogin = lastLoginIndex > 0 ? user.loginHistory[lastLoginIndex] : null;
    user.loginHistory.push({ timestamp: currentTime, ipAddress: String(ipAddress) }); // Add new login entry

    // If loginHistory exceeds 5 entries, remove the oldest ones
    if (user.loginHistory.length > 5) {
      user.loginHistory = user.loginHistory.slice(-5); // Keep only the last 5 entries
    }

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "10d" });
    // Set the token as an HTTP-only cookie
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`);
    res.status(201).json({ success: true, message: 'Logged IN Successfully', token, currentLogin: { timestamp: currentTime, ipAddress }, lastLogin: previousLogin || "No previous login available", loginHistory: user.loginHistory, });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}
