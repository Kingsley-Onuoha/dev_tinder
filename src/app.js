const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, age } = req.body;

  try {
    //validating user about to be signed up using this validation helper function
    validateSignupData(req);

    //Encrypting users password
    const passwordHarsh = await bcrypt.hash(password, 10);

    destr
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user

    res.send(user)
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    //Authenticating if email used to login is in our DB
    const user = await User.findOne({
      emailId: emailId,
    });
    //if not in DB throw error
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //comparing if the password matches with that of the user in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Generating token
      const token = await jwt.sign({ _id: user._id }, "DEVTinder_123");

      //Sending the token to cookie
      res.cookie("token", token);

      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
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
