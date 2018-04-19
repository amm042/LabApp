
var router = require('express').Router();

router.get("/", (req, res, next)=>{
  console.log("got hello world request")
  res.json({result:"ok", message:"Hello World"})
})

module.exports = router
