const validator = require("validator");
const validateSignUpData = (firstName, lastName, password, emailId) => {
  if (!firstName || !lastName) {
    throw new Error("Enter Name");
  } else if (firstName.length < 4 || firstName.length > 30) {
    throw new Error("Enter Firstname between 4 to 30 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateLoginData = (emailId) => {
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email id");
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
};
