const express = require("express");
const bcrypt = require("bcrypt");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const User = require("../models/user");

const authRouter = express.Router();

// signup user
authRouter.post("/signup", async (req, res) => {
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

// login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(emailId);

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;
