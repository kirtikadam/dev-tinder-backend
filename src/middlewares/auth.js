const jwt = require("jsonwebtoken");
const serverConfig = require("../config/index");
const User = require("../models/user");

// checking if token exists in request
const userAuth = async (req, res, next) => {
  try {
    // Read token from req cokies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Invalid token. Please re-login!")
    }

    // Validate token
    const decodedObj = await jwt.verify(token, serverConfig.privateKey);

    // Find the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    // if user is valid attach is to req obj so can be used in next function no need to find again
    req.user = user;
    // next is called to move to the request handler
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
