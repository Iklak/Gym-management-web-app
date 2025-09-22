const gymModal = require("../models/gym.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.cookie_token;

    // If no cookie, check Authorization header
    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: "no token ,authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.gym = await gymModal.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = auth;
