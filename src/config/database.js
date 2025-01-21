const mongoose = require("mongoose");

// Connect to the cluster
// returns a promise so add in try catch
const connetDB = async () => {
  await mongoose.connect(
    ""
  );
};

module.exports = connetDB;
