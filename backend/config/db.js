const mongoose = require("mongoose");

const connectDataBase = async (url) => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("Database connected...");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDataBase;
