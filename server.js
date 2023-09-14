const express = require("express");
const app = express();
const createError = require("http-errors");

const routerUser = require("./Routes/User.route");
require("dotenv").config();
// require("./helpers/connections_mongdb")

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json("hello word");
});

app.use("/user", routerUser);

app.use((error, req, res, next) => {
  console.log("nhay vao day", error);
  res.json({
    message: error.message,
    status: error.status,
  });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
