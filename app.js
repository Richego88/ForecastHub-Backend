require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./models/connection");

const indexRouter = require("./routes/index");
const weatherRouter = require("./routes/weather");
const usersRouter = require("./routes/users");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/weather", weatherRouter);
app.use("/users", usersRouter);

module.exports = app;
