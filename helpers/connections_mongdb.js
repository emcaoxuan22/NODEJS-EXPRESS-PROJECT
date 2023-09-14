const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/test");

conn.on("connected", function () {
  console.log("mongoose is coneeted");
});

conn.on("disconnected", function () {
  console.log("mongoose diconnetesdfsadfd ");
});

conn.on("error", function (error) {
  console.log("mongoose id error");
});

process.on("SIGINT", async () => {
  await conn.close();
  process.exit(0);
});
module.exports = conn;
