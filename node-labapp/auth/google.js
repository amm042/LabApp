/*jshint esversion: 6 */
var Semester = require("../api/models/semester")
var Person = require("../api/models/person")
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
        // first, let's just update the person
        Person.findOneAndUpdate({email:profile.email},{$set:{name:profile.name, sub:profile.sub, email:profile.email}},{new: true}, function(err,person){
          if (err){
            console.log(err);
          } else{
            console.log(person);
          }
        });                  
        Semester
          .findOne({course: req.body.course, name: req.body.semester})
          .select("professors", "tas","students")
          .populate()
          .exec(function(err,semester){
            role = "";
            thePerson = null;
            for (person in semester.students){
              if (person.sub == profile.sub){
                role = "student";
                thePerson = person;
                break;
              }
            }
            for (person in semester.tas){
              if (person.sub == profile.sub){
                role = "ta";
                thePerson = person;
                break;
              }
            }
            for (person in semester.student){
              if (person.sub == profile.sub){
                role = "professor";
                thePerson = person;
                break;
              }
            }
            if (role == "" || thePerson == null){
              res.json({ result: "error", error: "the email does not exist in database" });              
            }
            else{
              req.session.profile = profile;
              req.session.role = role;
              req.session.course = course;
              req.session.semester = semester;
              res.json({result:"ok", person: thePerson, role:role});
            }
          });
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
