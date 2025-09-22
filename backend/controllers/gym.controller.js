const gymModal = require("../models/gym.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userName, password, email, profilePic, gymName } = req.body;

    // Check if user already exists
    const isExist = await gymModal.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newGym = new gymModal({
      userName,
      email,
      password: hashPassword,
      gymName,
      profilePic,
    });

    await newGym.save();

    // Don’t send password in response
    const { password: _, ...userWithoutPassword } = newGym._doc;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await gymModal.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Exclude password before sending
    const { password: _, ...userWithoutPassword } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("cookie_token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      gym: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true, // enable logs
  debug: true, // include SMTP traffic in logs
});

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const gym = await gymModal.findOne({ email });

    if (gym) {
      // const buffer = crypto.randomBytes(4);
      const token = Math.floor(100000 + Math.random() * 900000);

      console.log(token);
      gym.resetPasswordToken = token;
      gym.resetPasswordExpires = Date.now() + 3600000;
      await gym.save();
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "password Reset",
        text: `you requested a password reset.Your OTP is :${token}`,
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ error: "server error", errorMsg: error });
        } else {
          res
            .status(200)
            .json({ success: true, message: "OTP Sent to your email" });
        }
      });
    } else {
      res.status(400).json({ success: false, message: "gym does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const gym = await gymModal.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!gym) {
      return res
        .status(400)
        .json({ success: false, message: "otp is invalid or has expire" });
    }
    res
      .status(200)
      .json({ success: true, message: "OTP is successfully verified" });
  } catch (error) {
    res.status(500).json({
      error: "server error",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!newPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    const gym = await gymModal.findOne({ email });
    if (!gym) {
      return res.status(400).json({
        success: false,
        message: "some technical issue , please try again later",
      });
    }
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    gym.password = hashNewPassword;
    gym.resetPasswordToken = undefined;
    gym.resetPasswordExpires = undefined;
    await gym.save();
    res
      .status(200)
      .json({ success: true, message: "password reset Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "interna server error" });
  }
};

const logOut = (req, res) => {
  res
    .clearCookie("cookie_token", cookieOptions)
    .json({ message: "logout successfully." });
};

module.exports = {
  register,
  logOut,
  login,
  sendOtp,
  checkOtp,
  resetPassword,
};
