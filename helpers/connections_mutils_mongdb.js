const mongoose = require("mongoose");
require("dotenv").config();
function newConnection(uri) {
  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on("connected", function () {
    console.log(`mongoose is coneeted ${this.name}`);
  });

  conn.on("disconnected", function () {
    console.log(`mongoose diconneted ${this.name}`);
  });

  conn.on("error", function (error) {
    console.log(`mongoose id error, ${error}`);
  });

  process.on("SIGINT", async () => {
    await conn.close();
    process.exit(0);
  });
  return conn;
}
const testConnection = newConnection(process.env.URI_MONGODB_TEST);
// console.log(testConnection)
const userConnection = newConnection(process.env.URI_MONGODB_USER);

module.exports = {
  testConnection,
  userConnection,
};
