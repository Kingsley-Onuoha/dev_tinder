const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://onuohakingsley521:NJ1ldmw7sbkpn5gj@namastenode.qkop2.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
