const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/index");
const generateToken = require("../utils/index");
const verifyToken = require("../middleware/index");
const nodemailer = require("nodemailer");

router.get("/test", (req, res) =>
  res.json({ message: "Api Testing successful" })
);

router.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ message: "User Created" });
  }

  res.status(201).json({ message: "User already Exists" });
});

router.post("/authentication", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // Generate token and include in the response
  const token = generateToken(user);
  return res.json({ token });
});

router.get("/data", verifyToken, (req, res) => {
  res.json({ message: `Welcome , ${req.user.email}! This is protected data` });
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  // Generate reset token
  const token = Math.random().toString(36).slice(-8);
  user.restPasswordToken = token; // Fixed typo
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry time (fixed to 1 hour)

  await user.save();

  // Create transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Fixed 'password' to 'pass'
    },
  });

  // Email options
  const message = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Reset Password",
    text: `You are receiving this because you (or someone else) have requested a password reset for your account.\n\n
Please use the following token to reset your password: ${token}\n\n
If you did not request a password reset, please ignore this email.`,
  };

  // Send email
  transporter.sendMail(message, (err, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong, try again!" }); // Add return to stop further execution
    }

    // Success response
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params; // Token from URL parameter
  const { password } = req.body; // New password from request body

  // Validate password length
  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
    // Find the user by reset token and ensure token has not expired
    const user = await User.findOne({
      restPasswordToken: token.toLowerCase(),
      resetPasswordExpires: { $gt: Date.now() }, // Token must still be valid
    });

    // Debugging: Log the token and user
    console.log("Received Token:", token);
    console.log("Current Time:", Date.now());
    console.log("User found:", user);

    if (!user) {
      console.log("User not found or token expired.");
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Update the user's password and reset the token fields
    user.password = hashedPassword;
    user.restPasswordToken = null; // Clear token field
    user.resetPasswordExpires = null; // Clear expiration field

    // Log the user object before saving
    console.log("User before saving:", user);

    // Save the updated user document
    await user.save();

    // Log the user object after saving
    console.log("User saved successfully:", user);

    // Send a success response
    return res.status(200).json({ message: "Password updated successfully. Please log in with your new password." });

  } catch (error) {
    // Handle unexpected errors
    console.error("Error occurred during password update:", error);
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

module.exports = router;


