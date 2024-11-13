const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const {
  validateEditProfileData,
  validateEditedPassword,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    if (!validateEditedPassword(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    newPassword = req.body.password;

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = newPasswordHash;

    await loggedInUser.save();

    res.json({
      message:
        loggedInUser.firstName + " your password was changed successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message:
        loggedInUser.firstName + " your profile was updated successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = profileRouter;
