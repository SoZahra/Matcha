import bcryptjs from "bcryptjs";
import * as User from "../models/user.model.js";
import { sendVerifEmail } from "../config/email.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validEmail.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }

    const validName = /^[a-zA-Z\s'-]+$/;
    if (!validName.test(firstName) || !validName.test(lastName)) {
      return res.status(400).json({ error: "Invalid name format" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.createUser(
      email,
      username,
      passwordHash,
      firstName,
      lastName
    );

    await User.updateVerificationToken(newUser.id, verificationToken);
    await sendVerifEmail(email, username, verificationToken);

    return res.status(201).json({
      message:
        "Registration successful! Check your email to verify your account.",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

// export const login = (req, res) => {
//     res.status(200).json({message: "Signin Successully... ! "})
// }

// export const verifyEmail = (req, res) => {
//     res.status(200).json({message: "Email verified... ! "})
// }

// export const forgotPassword = (req, res) => {
//     res.status(200).json({message: "Reset email sent ! "})
// }

// export const resetPassword = (req, res) => {
//     res.status(200).json({message: "Password reset successfully ! "})
// }
