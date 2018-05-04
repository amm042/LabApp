var mongoose = require('mongoose'),
    Course = mongoose.model('course'),
    Semester = mongoose.model('semester'),
    Assignment = mongoose.model('assignment');

exports.getAll = function(req, res) {
  Semester.find({}).lean().exec(function(err, semesters) {
    if (err)
      res.send({error: err});
    res.json({semesters});
  });
};

exports.addSemester = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      var new_semester = new Semester(req.body);
      new_semester.save(function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          course.semesters.push( semester._id );
          course.save(function(err, course) {
            if (err)
              res.send({error: err});
            res.json({ course, semester });
          });
        }
      });
    }
  });
};

exports.getSemester = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      const query = {
        '_id': { '$in': course.semesters.map(id => mongoose.Types.ObjectId(id)) },
        name: req.params.semester_name
      };
      Semester.findOne({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id))}, name: req.params.semester_name}, function(err, semester) {
        if (err)
          res.send({error: err});
        res.json({ semester });
      });
    }
  });
};

exports.updateSemester = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      Semester.findOneAndUpdate(
        {
          '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id)) },
          name: req.params.semester_name
        },
        req.body,
        {new: true},
        function(err, semester) {
          if (err) {
            res.send({error: err});
          } else {
            semester.save(function(err, semester) {
              if (err)
                res.send({error: err});
              res.json({ semester });
            });
          }
        }
      );
    }
  });
};


exports.deleteSemester = function(req, res) {
  Course.findOne({ name: req.params.course_name }, function(err, course) {
    if (err) {
      res.send({error: err});
    } else {
      Semester.findOne({ '_id': { $in: course.semesters.map(id => mongoose.Types.ObjectId(id))}, name: req.params.semester_name}, function(err, semester) {
        if (err) {
          res.send({error: err});
        } else {
          course.semesters.pull(mongoose.Types.ObjectId(semester._id));
          course.save(function(err, course) {
            if (err) {
              res.send({error: err});
            } else {
              Semester.remove({ '_id': mongoose.Types.ObjectId(course._id)}, function(err) {
                if (err)
                  res.send({error: err});
                res.json({ course, semester });
              });
            }
          });
        }
      });
    }
  });
};
