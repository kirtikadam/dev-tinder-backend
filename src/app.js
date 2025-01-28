const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

// signup user
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, emailId } = req.body;

    // validate the data
    validateSignUpData(firstName, lastName, password, emailId);

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash = ", passwordHash);

    // store user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // creating a new instance of the user model

    await user.save(); // data will be saved to DB & returns a promise
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(emailId);

    const user = await User.findOne({ emailId: emailId });
    if(!user) {
      throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials")
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// get user by emailId
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length !== 0) {
      res.send(user);
    } else {
      res.status(400).send("User not found");
    }
  } catch (err) {
    res.status(400).send("Error getting user " + err.message);
  }
});

// get all users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// delete user from database
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// update data for a user with userId
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     await User.findByIdAndUpdate({ _id: userId }, data);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong: " + err.message);
//   }
// });

// update data for a user with emailId
app.patch("/user", async (req, res) => {
  const email = req.body.emailId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["photoURL", "about", "age", "lastName", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Cannot add more than 10 skills");
    }
    await User.findOneAndUpdate({ emailId: email }, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err?.message);
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
