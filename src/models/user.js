const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong" + value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(
            "Gender data is not valid, can either be Male, Female or others"
          );
        }
      },
    },
    photo: {
      type: String,
      default:
        "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a description about me",
      trim: true,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTinder_123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputedByUser) {
  const user = this;
  const passwordHarsh = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputedByUser,
    passwordHarsh
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
