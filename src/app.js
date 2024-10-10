const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("All Users");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deletedUser", (req, res) => {
  res.send("Deleted Users");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
