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

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = { expiresIn: "1y" };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const veryfiAccessToken =  (req, res, next) => {

    if (!req.headers["authorization"]) {
      throw createHttpError.Unauthorized();
    }
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if(err.name === "JsonwebTokenError"){
          throw createHttpError.Unauthorized()
        }
        throw createHttpError.Unauthorized(err.message);
      }
      req.payload = payload;
      next();
    });
    
};

const veryfiRefreshToken =  (req, res, next) => {

  if (!req.headers["authorization"]) {
    throw createHttpError.Unauthorized();
  }
  const token = req.headers["authorization"].split(" ")[1];
  JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if(err.name === "JsonwebTokenError"){
        throw createHttpError.Unauthorized()
      }
      throw createHttpError.Unauthorized(err.message);
    }
    req.payload = payload;
    next();
  });
  

};
module.exports = {
  signAccessToken,
  veryfiAccessToken,
  signRefreshToken,
  veryfiRefreshToken
};
