'use strict';
module.exports = function(app) {
  var assignments = require('../controllers/assignment-controller');

  app.route('/assignments')
    .get(assignments.getAll)

  app.route('/semesters/:semester_name')
    .post(assignments.addAssignment);

  // Assignment Routes
  app.route('/semesters/:semester_name/:assignment_name')
    .get(assignments.getAssignment)
    .put(assignments.updateAssignment)
    .delete(assignments.deleteAssignment);
};
