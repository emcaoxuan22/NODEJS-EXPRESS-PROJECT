const express = require("express");
const route = express.Router();
const User = require("../Models/User.Model");
const createHttpError = require("http-errors");
// const {testConnection} = require("../helpers/connections_mutils_mongdb")
const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  veryfiAccessToken,
} = require("../helpers/jwt_services");

route.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate(req.body);
    if (error) {
      throw createHttpError(error.details[0].message);
    }
    const isExits = await User.findOne({ username: email });
    if (isExits) {
      throw createHttpError.Conflict(`${email} is realdy been register`);
    }
    const isCreate = await User.create({
      username: email,
      password: password,
    });

    return res.json({
      status: "Ok",
      elemen: isCreate,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/refresh-token", (req, res) => {
  res.send("funtion-refresh-token");
});

route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate(req.body);
    if (error) {
      throw createHttpError(error.details[0].message);
    }

    const user = await User.findOne({ username: email });
    if (!user) {
      throw createHttpError.NotFound("user not exits");
    }

    const isValid = await user.isCheckPassword(password);
    console.log(isValid);
    if (!isValid) {
      throw createHttpError.Unauthorized();
    }
    const accessToken = await signAccessToken(user._id);
    res.json(accessToken);
  } catch (error) {
    next(error);
  }
});

route.post("/logout", (req, res) => {
  res.send("funtion-logout");
});

route.get("/getlist", veryfiAccessToken, (req, res, next) => {
  const userList = {
    user1: "longcv@gmail.com",
    user2: "hiencv@gmail.com",
  };
  console.log(req.payload);
  res.json(userList);
});
module.exports = route;
