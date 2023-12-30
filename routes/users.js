const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

const isValidEmail = function (email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
/* POST user/signup*/

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else if (!isValidEmail(req.body.email)) {
    res.json({ result: false, error: "Invalid email format" });
  } else {
    User.findOne({ email: req.body.email }).then((data) => {
      console.log("yo");
      if (data) {
        res.json({ result: false, error: "User already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        newUser.save().then(() => {
          res.json({ result: true });
        });
      }
    });
  }
});

// POST /signin : route chargée de vérifier la connexion d’un utilisateur.
// Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result: false, error: 'Missing or empty fields' }.
// Si aucun utilisateur est trouvé avec cet email et mdp, renvoyez : { result: false, error: 'User not found' }.
// Sinon, renvoyez : { result: true }.

// POST user/signin:
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.json({ result: false, error: "User not found" });
        } else {
          if (user.password !== req.body.password) {
            res.json({ result: false, error: "Wrong password" });
          } else {
            res.json({ result: true });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ result: false, error: "Internal server error" });
      });
  }
});

module.exports = router;
