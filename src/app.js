const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Kirti",
    lastName: "Kadam",
    emailId: "kirti@kadam.com",
    password: "Kirti@123",
  };
  const user = new User(userObj); // creating a new instance of the user model
  try {
    await user.save(); // data will be saved to DB & returns a promise
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error adding user ", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to Database!");
    app.listen(4000, () => {
      console.log("Server up...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
