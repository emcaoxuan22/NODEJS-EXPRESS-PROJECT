const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const redis = require("./connections_redis");
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
      redis.set(
        userId.toString(),
        token,
        "EX",
        365 * 24 * 60 * 60,
        (err, reply) => {
          if (err) {
            return reject(createHttpError.InternalServerError());
          }
          resolve(token);
        }
      );
    });
  });
};

const veryfiAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    throw createHttpError.Unauthorized();
  }
  const token = req.headers["authorization"].split(" ")[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonwebTokenError") {
        throw createHttpError.Unauthorized();
      }
      throw createHttpError.Unauthorized(err.message);
    }
    req.payload = payload;
    next();
  });
};

const veryfiRefreshToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw createHttpError.Unauthorized();
    }
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        try {
          if (err) {
            if (err.name === "JsonwebTokenError") {
              throw createHttpError.Unauthorized();
            }
            throw createHttpError.Unauthorized(err.message);
          }
          await redis.get(payload.userId, async (err, reply) => {
            try {
              if (err) {
                throw createHttpError.InternalServerError();
              }
              if (token != reply) {
                throw createHttpError.InternalServerError();
              }
              req.payload = payload;
              next();
            } catch (error) {
              next(error);
            }
          });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signAccessToken,
  veryfiAccessToken,
  signRefreshToken,
  veryfiRefreshToken,
};
