var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  db_config = require('./db_config'),
  Course = require('./api/models/course-model'),
  Semester = require('./api/models/semester-model'), //created model loading here
  Assignment = require('./api/models/assignment-model'),
  Problem = require('./api/models/problem-model'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://${db_config.username}:${db_config.password}@${db_config.database}`,
  err => { if (err) throw err; }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
