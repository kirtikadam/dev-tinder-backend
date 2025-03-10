const mongoose = require("mongoose");

// Connect to the cluster
// returns a promise so add in try catch
const connetDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kadamkirti:1MPfJpehpcXOZNkg@node1.nmg9s.mongodb.net/devTinder"
  );
};

module.exports = connetDB;
