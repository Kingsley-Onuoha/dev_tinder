const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Floxy",
    lastName: "Onuoha",
    emailId: "flox@gmail.com",
    password: "flox@123",
  });
  try {
    user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error Saving User" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Successfully Established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on PORT 3000");
    });
  })
  .catch((err) => {
    console.err("Database Cannot Be Connected");
  });
