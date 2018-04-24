var router = require("express").Router();

function verifyProfs(req, res, next) {
  if (req.session && req.session.profile) {
    User.findOne({ sub: req.session.profile.sub }, function(err, user) {
      if (user && user.role == "Student") {
        //   refresh the cookie
        req.user = user;
        req.session.lastAccess = new Date();
      }
      res.json({ result: "you don't have access right to this API"});
    });
  } else {
    res.json({ result: "you don't have access rights to this API"});
  }
}
