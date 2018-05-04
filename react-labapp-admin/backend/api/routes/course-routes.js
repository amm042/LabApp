'use strict';
module.exports = function(app) {
  var courses = require('../controllers/course-controller');

  // semester Routes
  app.route('/courses')
    .get(courses.getAll)
    .post(courses.addCourse);

  app.route('/courses/:course_name')
    .get(courses.getCourse)
    .put(courses.updateCourse)
    .delete(courses.deleteCourse);
};
