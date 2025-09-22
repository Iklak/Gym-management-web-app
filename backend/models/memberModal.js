const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "membership.modal",
      required: true,
    },

    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gym.model",
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    lastPayment: {
      type: Date,
      default: new Date(),
    },
    nextBillDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const memberModal = mongoose.model("member", memberSchema);

module.exports = memberModal;
