require("../config/config");
const mongoose = require("mongoose");



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URLDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB Status : Connected OK");
  } catch (error) {
    console.log(error);
    throw new Error("DB Status : Failed :c");
  }
};

module.exports = {
  dbConnection,
};