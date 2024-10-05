const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({
    firstName: "Kingsley",
    lastName: "Onuoha",
  });
});
app.post("/user", (req, res) => {
  res.send("Data successfully sent to DB");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
