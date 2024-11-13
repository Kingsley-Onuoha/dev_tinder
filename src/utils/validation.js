const validator = require("validator");
const { validate } = require("../models/user");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a very strong password");
  }
};

const validateEditProfileData = (req) => {
  // These are the fields which can be edited
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photo",
    "gender",
    "age",
    "about",
    "skills",
  ];
  //Looping through the req.body fields
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  //This returns a boolean
  return isEditAllowed;
};

const validateEditedPassword = (req) => {
  //Destructuring password from requests body
  const { password } = req.body;
  //Checking the strength of password
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a very strong password");
  }
  // This is the field which can be edited
  const allowedEditedField = ["password"];
  //Looping through the req.body fields
  const isEditPassword = Object.keys(req.body).every((field) =>
    allowedEditedField.includes(field)
  );
  //This returns a boolean
  return isEditPassword;
};
module.exports = {
  validateSignupData,
  validateEditProfileData,
  validateEditedPassword,
};
