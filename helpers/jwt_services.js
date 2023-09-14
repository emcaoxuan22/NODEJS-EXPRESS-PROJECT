const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = { expiresIn: "1h" };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const veryfiAccessToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw createHttpError.Unauthorized();
    }
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      console.log(err);
      if (err) {
        throw createHttpError.Unauthorized();
      }
      req.payload = payload;
      next();
    });
  } catch (error) {
    // next(createHttpError.Unauthorized());
  }
};
module.exports = {
  signAccessToken,
  veryfiAccessToken,
};
