const express = require("express");
const memberShipRouter = express.Router();
const {
  addMemberShip,
  getMembership,
} = require("../controllers/membership.controller");
const auth = require("../middlewares/auth");

memberShipRouter.post("/add-membership", auth, addMemberShip);
memberShipRouter.get("/getMemberShip", auth, getMembership);

module.exports = memberShipRouter;
