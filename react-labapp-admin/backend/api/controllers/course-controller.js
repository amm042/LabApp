var mongoose = require('mongoose'),
  Semester = mongoose.model('semester'),
  Course = mongoose.model('course');

exports.getAll = function(req, res) {
  Course.find({}).lean().exec(function(err, courses) {
    if (err)
      res.send({error: err});
    res.json({courses});
  });
};

exports.addCourse = function(req, res) {
  var new_course = new Course(req.body);
  new_course.save(function(err, course) {
    if (err)
      res.send({error: err});
    res.json({course});
  });
};

exports.getCourse = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err)
      res.send({error: err});
    res.json({course});
  });
};

exports.updateCourse = function(req, res) {
  Course.findOneAndUpdate({ name: req.params.course_name }, req.body, {new: true}, function(err, course) {
    if (err)
      res.send({error: err});
    res.json({course});
  });
};


exports.deleteCourse = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      Semester.remove({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id)) } }, function(err) {
        if (err) {
          res.send({error: err});
        } else {
          Course.remove({ '_id': mongoose.Types.ObjectId(course._id) }, function(err) {
            if (err) {
              res.send({error: err});
            } else {
              res.json({ course });
            }
          });
        }
      });
    }
  });
};
