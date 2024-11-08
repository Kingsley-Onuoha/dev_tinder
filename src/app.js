const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const jwt = require("jsonwebtoken")

app.use("/", authRouter)
app.use("/", profileRouter);
app.use("/", requestsRouter);




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
