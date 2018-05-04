'use strict';
module.exports = function(app) {
  var semesters = require('../controllers/semester-controller');

  // semester Routes
  app.route('/semesters')
    .get(semesters.getAll)

  app.route('/courses/:course_name')
    .post(semesters.addSemester);

  app.route('/courses/:course_name/:semester_name')
    .get(semesters.getSemester)
    .put(semesters.updateSemester)
    .delete(semesters.deleteSemester);
};
