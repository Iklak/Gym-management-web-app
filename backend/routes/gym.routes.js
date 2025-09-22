const express = require("express");
const {
  register,
  login,
  sendOtp,
  checkOtp,
  resetPassword,
  logOut,
} = require("../controllers/gym.controller");

const gymRoutes = express.Router();

gymRoutes.post("/register", register);
gymRoutes.post("/login", login);
gymRoutes.post("/reset-password/sendotp", sendOtp);
gymRoutes.post("/reset-password/checkotp", checkOtp);
gymRoutes.post("/reset-password", resetPassword);
gymRoutes.post("/logout", logOut);

module.exports = gymRoutes;
