const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to database: ON");
  } catch (e) {
    console.log("Error to connect to database", e);
    throw new Error("Error to connect to database");
  }
};

module.exports = { dbConnection };
