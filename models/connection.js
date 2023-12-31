const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Rchegwin88:Junior621700@cluster0.mh6vioy.mongodb.net/weatherapp";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));

module.exports = connectionString;
