const express = require("express");
const app = express();
const authController = require("./auth.controller");

app.get("/login", (req, res) => {
  res.status(200).send("Get login working");
});
app.post("/login", authController.doLogin);

module.exports = app;
