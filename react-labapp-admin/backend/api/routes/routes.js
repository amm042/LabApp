'use strict';
module.exports = function(app) {
  var course_routes = require('./course-routes');
  var semester_routes = require('./semester-routes');
  var assignment_routes = require('./assignment-routes');
  var problem_routes = require('./problem-routes');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  course_routes(app);
  semester_routes(app);
  assignment_routes(app);
  problem_routes(app);
};
