const express = require("express");
const requestsRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
      const user = req.user
      console.log("Sending Connection Request")
      res.send(user.firstName + "Sent Connection Request")
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = requestsRouter
