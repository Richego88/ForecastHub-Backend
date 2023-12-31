const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const City = require("../models/cities");

const weatherAPIKEY = "acb0801847b36845ea5b16de3e2a5d7a";

// Mock Data used to try the app before connecting to MongoDB
// let weather = [
//   {
//     cityName: "London",
//     description: "cloudy",
//     main: "clouds",
//     tempMin: 12.95,
//     tempMax: 17.39,
//   },
//   {
//     cityName: "Rio de Janeiro",
//     main: "clear",
//     description: "sunny",
//     tempMin: 23.98,
//     tempMax: 28.63,
//   },
//   {
//     cityName: "Stockholm",
//     description: "sunny",
//     main: "clear",
//     tempMin: 6.03,
//     tempMax: 10.59,
//   },
// ];

// POST new village
router.post("/", function (req, res) {
  //First we check if the city is already shown or not. We use $regex which is the operator to check for regular expressions in MongoDB. then we construct a regular expression object with JS new Regexp constructor where the first paramete is the word you want to match and the second one is the options you are looking for. In this case "i" for case sensitivity
  City.findOne({
    cityName: { $regex: new RegExp(req.body.cityName, "i") },
  })
    .then((data) => {
      if (data === null) {
        //Then if there is no data about this city yet, we fetch it from the API
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${weatherAPIKEY}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            // Once we have the data we create a new document for our collection
            const newCity = new City({
              cityName: req.body.cityName,
              main: data.weather[0].main,
              description: data.weather[0].description,
              tempMin: parseInt(data.main.temp_min.toFixed(0)),
              tempMax: parseInt(data.main.temp_max.toFixed(0)),
            });

            // We save the document and we send the new updated collection
            newCity.save().then((newData) => {
              res.json({ result: true, weather: newData });
            });
          });
      } else {
        // If the document already exist then we dont add it to the collection and we send a message
        res.json({ result: false, error: "City already saved" });
      }
      //   We try to catch errors using error handling to prevent the app from crashing and so improving user experience
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: false, error: "Internal server error" });
    });
});

/* GET all the information on the collection. */
router.get("/", function (req, res) {
  // We want all the information on the collection so a simple databse.find()
  City.find()
    .then((cities) => {
      res.json({ weather: cities });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: false, error: "Internal server error" });
    });
});

/* GET by city name. So using parameters*/
router.get("/:cityName", function (req, res) {
  // Here we are using a parameter to find a specific document in the collection so we use req.params.cityName instead of req.body.cityName. The rest is pretty much the same
  City.findOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  })
    .then((data) => {
      if (data) {
        res.json({ result: true, weather: data });
      } else {
        res.json({ result: false, error: "City not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: false, error: "Internal server error" });
    });
});

//DELETE by city name. Using parameters again. Similar route
router.delete("/:cityName", function (req, res) {
  //Sames as before we use req.params. Here we are looking for a specific documetn to delete from the collection
  City.deleteOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then(() => {
    City.find()
      .then((cities) => {
        res.json({ result: true, weather: cities });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ succes: false, error: "Internal server error" });
      });
  });
});

module.exports = router;
