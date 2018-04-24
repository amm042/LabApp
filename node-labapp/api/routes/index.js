/*jshint esversion: 6 */
var router = require("express").Router();

function verifyStudent(req, res, next) {
  if (req.session && req.session.profile) {
    User.findOne({ sub: req.session.profile.sub }, function(err, user) {
      if (user) {
        req.user = user;
        req.session.lastAccess = new Date();
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    //   process the deata here
    next();
  }
}

router.get("/", (req, res, next) => {
  console.log("got hello world request");
  res.json({ result: "ok", message: "Hello World" });
});

router.get("/student", verifyStudent, (req, res, next) => {
});

router.use("/students", require("./students"));
router.use("/professors", require("./professors"));
router.use("/tas", require("./tas"));
export default router;
