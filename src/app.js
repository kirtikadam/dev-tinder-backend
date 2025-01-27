const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("request = ", req.body);
  const userObj = req.body;
  const user = new User(userObj); // creating a new instance of the user model
  try {
    await user.save(); // data will be saved to DB & returns a promise
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error adding user ", +err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length !== 0) {
      res.send(user);
    } else {
      res.status(400).send("User not found");
    }
  } catch (err) {
    res.status(400).send("Error getting user", +err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!", +err.message);
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
