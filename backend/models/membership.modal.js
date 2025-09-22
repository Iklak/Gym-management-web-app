const mongoose = require("mongoose");

const MembershipSchema = mongoose.Schema({
  months: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gym.model",
    required: true,
  },
});

const memberShipModal = mongoose.model("membership", MembershipSchema);
module.exports = memberShipModal;
