const express = require("express");
const app = express();
const genreController = require("./genre.controller");

app.get("/", genreController.allCategory);

app.get("/:category", genreController.allDesignation);

module.exports = app;
