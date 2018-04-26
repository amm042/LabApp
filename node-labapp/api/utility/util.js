const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
var Semester = require("../api/models/semester")
var Person = require("../api/models/person")
var Course = require("../api/models/course")

/* ------------------- Semester ------------------ */

/* add a semester */
function addSemester(newSemester) {
	var semester = new Semester(newSemester);
	semester.save(function (err) {
		if (err) return handleError(err);
	});
}

/* change name of a semester */
function changeSemesterName(oldName, newName) {
	Semester.findOneAndUpdate({
		name: oldName
	}, {
		$set: {
			name: newName
		}
	}, {
		new: true
	}, function (err, newSemester) {
		if (err) {
			console.log(error);
			return;
		}
		else{
			console.log("semester changes name successfully!")
			console.log(newSemester);
		}
	});
}

/* add a course */
function addCourse(newCourse) {
	var course = new Course(newCourse);
	course.save(function (err) {
		if (err) return handleError(err);
	});
}


function addAssignmentToSemester(assignment, semester) {
	semester.assignments.push(assignment._id);
	semester.save(function (err, updatedSemester) {
		if (err) return handleError(err);
		//res.send(updatedSemester);
	});
}
/* add a person */

function addPerson(modelPerson) {
	var person = new Semester(modelPerson);
	person.save(function (err) {
		if (err) return handleError(err);
		// saved!
	});


}

function addPersonToSemester(person, semester) {
	// If the person's role is defined as TA, student and professor, add the person to Semester
	if (person.role == "TA") {
		semester.TAs.push(person._id);
	} else if (person.role == "Professor") {
		semester.professors.push(person._id);
	} else(person.role == "Student") {
		semester.students.push(person._id);
	}
	semester.save(function (err, updatedSemester) {
		if (err) return handleError(err);
		//res.send(updatedSemester);
	});
}


/* assign role to a person */
function assignRole(role, person) {
	person.role = role;
}

/* ------------------ Late cards ----------------- */

/* ------------------- Work ---------------------- */
function addWork(problem) {
	// An unsubmitted work is created when the first submit button is clicked
	var work = new Work;
	work.problem = problem._id;
}

function addfiles() {
	// file info is added to work when files are uploaded

}

function addPartner() {
	// add a partner

}

function deletePartner() {
	// Do we want to notify the deleted partner?
}

// function findASubmittedWork() {
// 	Work.findOne {
// 		workInfo: {
// 			submitted: true
// 		},
// 	}
// }