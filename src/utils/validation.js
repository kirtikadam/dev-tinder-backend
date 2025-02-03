const validator = require("validator");
const validateSignUpData = (firstName, lastName, password, emailId) => {
  if (!firstName || !lastName) {
    throw new Error("Enter Name");
  } else if (firstName.length < 3 || firstName.length > 30) {
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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoURL",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  //TODO: Validate the edited data

  return isEditAllowed;
};

const validateEditPassword = (req) => {
  const isPasswordValid = validator.isStrongPassword(req.body.password);
  return isPasswordValid;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData,
  validateEditPassword,
};
