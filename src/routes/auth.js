const express = require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, age } = req.body;

  try {
    //validating user about to be signed up using this validation helper function
    validateSignupData(req);

    //Encrypting users password
    const passwordHarsh = await bcrypt.hash(password, 10);

    const user = new User({
      //Destructured keys from req.body
      firstName,
      lastName,
      emailId,
      age,
      password: passwordHarsh,
    });
    //saving user in DB
    await user.save();
    //Send this response if saved
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving User " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  
    try {
        const { emailId, password } = req.body;

    //Authenticating if email used to login is in our DB
    const user = await User.findOne({
      emailId: emailId,
    });
    //if not in DB throw error
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //comparing if the password matches with that of the user in DB
    const isPasswordValid = await user.validatePassword;

    if (isPasswordValid) {
      //Generating token
      const token = await user.getJWT();

      //Sending the token to cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = authRouter;
