const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error Saving User" + err.message);
  }
});

// app.get("/feed", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length == 0) {
//       res.status(404).send("User not found")
//     } else {
//       res.send(users)
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({});
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User successfully deleted");
  } catch (error) {
    res.status(400).send("Somthing went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body
  const userId = req.body.userId
  console.log(data)
  console.log(userId)
  try {
    await User.findByIdAndUpdate({ _id: userId }, data)
    res.send("User Updated successfully")
  } catch (error) {
    res.status(400).send("Something Went Wrong!!")
  }
})

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
