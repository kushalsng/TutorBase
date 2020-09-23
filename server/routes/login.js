var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcrypt = require("bcryptjs");

router.post("/", function (req, res) {
  console.log("Searching for" + JSON.stringify(req.body.email));
  User.findOne({
    email: req.body.email,
  }).then(function (user) {
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {

        if (result == true) {
          console.log("Login success...");
          return res.json({message: "success"});
        } else {
          console.log("Incorrect password...");
          return res.json({message: "failure"});
        }
      });
    }
    if (!user) {
      console.log("User does not exist");
      return res.send.json({message: "dne"}); //does not exist
    }
  });
});

module.exports = router;