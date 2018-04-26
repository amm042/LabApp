/*jshint esversion: 6 */
var Course = require("../api/models/course");
var router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const config = require("../labapp-config.json");
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
async function verify(token) {
  let vparams = {
    idToken: token,
    audience: CLIENT_ID
  };
  const ticket = await client.verifyIdToken(vparams);
  const payload = ticket.getPayload();
  // TODO switch to logging module
  console.log(payload);
  return payload;
}

router.post("/logout", (req, res) => {
  // log out the current session.
  req.session.destroy();
  res.json({ result: "ok" });
});

router.post("/login", (req, res) => {
  // https://developers.google.com/identity/sign-in/web/backend-auth
  // react app handles the login and posts the token here.
  if ("token" in req.body && "course" in req.body && "semester" in req.body) {
    console.log("got login request, checking token...");
    // have to verify the token before using
    verify(req.body.token)
      .then(profile => {
        console.log(
          "verified sub=",
          profile.sub,
          "name=",
          profile.name,
          "email=",
          profile.email,
          "domain=",
          profile.hd
        );
        // got the profile. Now search for the person in course and semester
        Course
          .findOne({ name: req.body.course })
        .populate({'semester'})
        
          function(err, course) {};
      })
      .catch(err => {
        console.log(err);
        res.json({ result: "error", error: err });
      });
  } else {
    res.json({ result: "error", error: "no token!" });
  }
});

module.exports = router;
