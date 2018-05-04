'use strict';
module.exports = function(app) {
  var problems = require('../controllers/problem-controller');

  app.route('/problems')
    .get(problems.getAll);

  app.route('/courses/:course_name/:semester_name/:assignment_name')
    .post(problems.addProblem);

  // Assignment Routes
  app.route('/courses/:course_name/:semester_name/:assignment_name/:problem_name')
    .get(problems.getProblem)
    .put(problems.updateProblem)
    .delete(problems.deleteProblem);
};
