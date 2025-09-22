const express = require("express");
const memberRouter = express.Router();
const {
  getAllMember,
  registerMember,
  searchMember,
  monthlyMember,
  expiringWithin3Day,
  expiringWithin4To7Days,
  inactiveMember,
  expiredMember,
  getMemberDetails,
  changeStatus,
  updateMemberPlans,
} = require("../controllers/member.controller");

const auth = require("../middlewares/auth");

memberRouter.get("/all-member", auth, getAllMember);
memberRouter.post("/register", auth, registerMember);
memberRouter.get("/search", auth, searchMember);
memberRouter.get("/monthly", auth, monthlyMember);
memberRouter.get("/expire-3", auth, expiringWithin3Day);
memberRouter.get("/expire-7", auth, expiringWithin4To7Days);
memberRouter.get("/expire", auth, expiredMember);
memberRouter.get("/inactive", auth, inactiveMember);
memberRouter.get("/get-member/:id", auth, getMemberDetails);
memberRouter.post("/change-status/:id", auth, changeStatus);
memberRouter.put("/update-plan/:id", auth, updateMemberPlans);
module.exports = memberRouter;
