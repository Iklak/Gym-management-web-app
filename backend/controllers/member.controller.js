const { get } = require("mongoose");
const memberModal = require("../models/memberModal");
const memberShipModal = require("../models/membership.modal");
const getAllMember = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const members = await memberModal.find({
      gym: req.gym._id,
    });

    const totalMember = members.length;
    const limitedMember = await memberModal
      .find({ gym: req.gym._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      message: members.length
        ? "fetched members successfully"
        : "no member register yet",
      members: limitedMember,
      totalMember: totalMember,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

function addMontsToDate(months, joiningDate) {
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  const adjustedMonth = futureMonth % 12;

  const futureDate = new Date(futureYear, adjustedMonth, 1);

  const lastDayOfFutureMonths = new Date(
    futureMonth,
    adjustedMonth + 1,
    0
  ).getDate();
  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonths);
  futureDate.setDate(adjustedDay);
  return futureDate;
}
const registerMember = async (req, res) => {
  try {
    const { name, phone, address, membership, profilePic, joiningDate } =
      req.body;
    const member = await memberModal.findOne({ gym: req.gym._id, phone });
    if (member) {
      return res
        .status(409)
        .json({ error: "Allredy register with this phone No" });
    }
    const memberShip = await memberShipModal.findOne({
      _id: membership,
      gym: req.gym._id,
    });
    const memberShipMonth = memberShip.months;
    if (memberShip) {
      let jngDate = new Date(joiningDate);
      const nextBillDate = addMontsToDate(memberShipMonth, jngDate);
      let newMember = new memberModal({
        name,
        phone,
        address,
        membership,
        gym: req.gym._id,
        profilePic,
        nextBillDate: nextBillDate,
      });
      await newMember.save();

      res
        .status(200)
        .json({ success: true, message: "member added", newMember });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const member = await memberModal.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { phone: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: member.length
        ? "fetched member successfully"
        : "no such member exist yet",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const monthlyMember = async (req, res) => {
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const member = await memberModal
      .find({
        gym: req.gym._id,
        createdAt: {
          $gte: startMonth,
          $lte: endMonth,
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: member.length
        ? "fetched members successfully"
        : "no members found for this month",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const expiringWithin3Day = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDay = new Date();
    nextThreeDay.setDate(today.getDate() + 3);
    const member = await memberModal.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDay,
      },
    });
    res.status(200).json({
      message: member.length
        ? "fetched members successfully"
        : "no members found for this month",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
const expiringWithin4To7Days = async (req, res) => {
  try {
    const today = new Date();
    const nextFourDays = new Date();
    nextFourDays.setDate(today.getDate() + 4);

    const nextSevenDays = new Date();
    nextSevenDays.setDate(today.getDate() + 7);
    const member = await memberModal.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: nextFourDays,
        $lte: nextSevenDays,
      },
    });
    res.status(200).json({
      message: member.length
        ? "fetched members successfully"
        : "no members is expiring within 4-7 days",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const expiredMember = async (req, res) => {
  try {
    const today = new Date();
    const member = await memberModal.find({
      gym: req.gym._id,
      status: "Active",
      nextBillDate: {
        $lt: today,
      },
    });
    res.status(200).json({
      message: member.length
        ? "fetched members successfully"
        : "no such members has been expire ",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const inactiveMember = async (req, res) => {
  try {
    const member = await memberModal.find({
      gym: req.gym._id,
      status: "Pending",
    });
    res.status(200).json({
      message: member.length
        ? "fetched members successfully"
        : "no such members has is pending ",
      members: member,
      totalMember: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
const getMemberDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await memberModal.findOne({ gym: req.gym._id, _id: id });
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "no such member",
      });
    }

    return res.status(200).json({
      success: true,
      message: "member data fetched",
      member: member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const member = await memberModal.findOne({
      gym: req.gym._id,
      _id: id,
    });
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "no such member",
      });
    }
    member.status = status;
    await member.save();
    res
      .status(200)
      .json({ success: true, message: "status changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const updateMemberPlans = async (req, res) => {
  try {
    const { membership } = req.body;
    const { id } = req.params;
    const memberShip = await memberShipModal.findOne({
      gym: req.gym._id,
      _id: membership,
    });
    if (memberShip) {
      let getMonth = memberShip.months;
      let today = new Date();
      let nextBillDate = addMontsToDate(getMonth, today);
      const member = await memberModal.findOne({ gym: req.gym._id, _id: id });
      if (!member) {
        return res
          .status(409)
          .json({ success: false, message: "no such member is there" });
      }
      member.nextBillDate = nextBillDate;
      member.lastPayment = today;
      member.save();
      res
        .status(200)
        .json({ success: true, message: "member renew successfully", member });
    } else {
      return res
        .status(409)
        .json({ success: false, message: "no such member is there " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
module.exports = {
  getAllMember,
  registerMember,
  searchMember,
  monthlyMember,
  expiringWithin3Day,
  expiringWithin4To7Days,
  expiredMember,
  inactiveMember,
  getMemberDetails,
  changeStatus,
  updateMemberPlans,
};
