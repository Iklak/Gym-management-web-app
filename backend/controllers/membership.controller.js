const memberShipModal = require("../models/membership.modal");

const addMemberShip = async (req, res) => {
  try {
    const { months, price } = req.body;
    const membership = await memberShipModal.findOne({
      gym: req.gym._id,
      months,
    });
    if (membership) {
      membership.price = price;
      await membership.save();
      res.status(200).json({
        success: true,
        message: "updated successFully",
      });
    } else {
      const newMembership = new memberShipModal({
        price,
        months,
        gym: req.gym._id,
      });
      await newMembership.save();
      res.status(200).json({ message: "added succefully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getMembership = async (req, res) => {
  try {
    const logedIn = req.gym._id;

    if (logedIn) {
      const memberShip = await memberShipModal.find({ gym: logedIn });
      res.status(200).json({
        success: true,
        message: "membership fetched sucessfully.",
        membership: memberShip,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = {
  addMemberShip,
  getMembership,
};
