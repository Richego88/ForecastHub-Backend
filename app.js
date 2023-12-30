require("dotenv").config();

require("./models/connection");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const weatherRouter = require("./routes/weather");
const usersRouter = require("./routes/users");
const app = express();

console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
console.log("DATABASE_URL:", process.env.OWM_API_KEY);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-vercel-app.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/weather", weatherRouter);
app.use("/users", usersRouter);

module.exports = app;
