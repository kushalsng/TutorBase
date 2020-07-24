var express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");
var fs = require("fs");

router.post("/client", function (req, res) {
  //Make sure to source the .env file before running this endpoint. If that doesn't work just copy/paste the the key from .env into here
  sgMail.setApiKey(
    "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"
  );
  sgMail.setSubstitutionWrappers('{{', '}}');


  //Implement spam protection???
  console.log("Preparing client-email confirmatin message");
  
  const msg = {
    //replace with to: req.body.client_email
    to: "nguyenjason06@gmail.com",
    from: "tutorbaserpi@gmail.com",
    templateId: "7ea79e53-32fb-4127-8e60-4b260cb79648",
    substitutions: {
      //Replace with req.body.xxx
      clientName: "Johnny Appleseed",
    },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send success");
    }
  });

  res.send("Client Email Send Complete");

});

router.post("/tutor", function (req, res) {
  //Make sure to source the .env file before running this endpoint. If that doesn't work just copy/paste the the key from .env into here
  sgMail.setApiKey(
    "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"
  );
  //Set substitution wrappers
  sgMail.setSubstitutionWrappers('{{', '}}');
  //Implement spam protection???
  console.log("Submitted a confirmation email to tutor");
  
  const msg = {
    //replace with to: req.body.tutor_email
    to: "nguyenjason06@gmail.com",
    from: "tutorbaserpi@gmail.com",
    templateId: "86fadcab-b74f-4ba8-a0dc-f7c1c9a19919",
    substitutions: {
      //Replace with req.body.xxx
      clientName: "Johnny Appleseed",
    },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send success");
    }
  });

  res.send("Tutor Email Send Complete");
});

module.exports = router;
