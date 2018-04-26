/*jshint esversion: 6 */
var router = require("express").Router();
var Semester = require("../api/models/semester")
var Person = require("../api/models/person")
var Course = require("../api/models/course")

function verifyRole(role) {
    return function (req, res, next) {
        if (req.session && req.session.profile) {
            User.findOne({
                sub: req.session.profile.sub
            }, function (err, profile) {
                if (err) {
                    res.json({
                        result: "error",
                        error: err
                    });
                } else if (role == "all" || req.session.role == role) {
                    next();
                } else {
                    res.json({
                        result: "error",
                        error: "the caller do not have access right to this resource"
                    });
                }
            });
        } else {
            res.json({
                result: "error",
                error: "the call comes from an unaothorized source"
            });
        }
    }
}

router.get("/", (req, res, next) => {
    console.log("got hello world request");
    res.json({
        result: "ok",
        message: "Hello World"
    });
});

router.get("/courses", (req, res, next) => {
    Course.find({})
        .select("semester.name")
        .populate("semesters", "name")
        .exec(function (err, courses) {
            if (err) {
                res.json({
                    result: "err",
                    error: err
                });
                return err;
            } else {
                res.json(courses);
            }
        });
});

router.get("/persons", verifyRole("all"), (req, res, next) => {
    Semester.findOne({course:req.session.course, semester:req.session.semester})
        .select("professors","tas","students")
        .populate()
        .exec(function (err, semester) {
            if (err) {
                res.json({
                    result: "err",
                    error: err
                });
                return err;
            } else {
                res.json({result:"ok", people:semester.students.concat(semester.tas,semester.professors)});
            }
        });
});

router.get("/students", (req, res, next) => {
    Semester.findOne({course:req.session.course, semester:req.session.semester})
    .select("students")
    .exec(function (err, semester) {
        if (err) {
            res.json({
                result: "err",
                error: err
            });
            return err;
        } else {
            res.json({result:"ok", people: semester.students});
        }
    });
});

router.get("/tas", (req, res, next) => {
    Semester.findOne({course:req.session.course, semester:req.session.semester})
    .select("tas")
    .exec(function (err, semester) {
        if (err) {
            res.json({
                result: "err",
                error: err
            });
            return err;
        } else {
            res.json({result:"ok", people: semester.tas});
        }
    });
});

router.get("/professors", (req, res, next) => {
    Semester.findOne({course:req.session.course, semester:req.session.semester})
    .select("professors")
    .exec(function (err, semester) {
        if (err) {
            res.json({
                result: "err",
                error: err
            });
            return err;
        } else {
            res.json({result:"ok", people: semester.professors});
        }
    });
});

router.get("/tas", (req, res, next) => {
    // 
});

router.get("/instructors", (req, res, next) => {
    // 
});

router.get("/courses", (req, res, next) => {
    // 
});

router.get("/courses", (req, res, next) => {
    // 
});

router.get("/student", verifyRole, (req, res, next) => {});

export default router;