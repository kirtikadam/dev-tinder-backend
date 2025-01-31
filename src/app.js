const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const serverConfig = require("./config/index");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// signup user
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, emailId } = req.body;

    // validate the data
    validateSignUpData(firstName, lastName, password, emailId);

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

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
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, serverConfig.privateKey, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Sending connection request from - ");
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
