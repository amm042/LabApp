const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

/* ------------------- Semester ------------------ */

/* add a semester */
function addSemester(modelSemester){
	var semester = new Semester(modelSemester);
	semester.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	});
}
/* change name of a semester */
function changeSemesterName(semester,sName){
	Semester.findById(id, function(err,semester){
		if (err) return handleError(err);
		semester.name = sName;
		semester.save(function(err, updatedSemester){
			if (err) return handleError(err);
    		//res.send(updatedSemester);
		});
	});
}
/* change starting date ?? */

/* add an assignment */
function addAssignment(modelAssignment){
	var assignment = new Assignment(modelAssignment);
	assignment.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	});
}

function addAssignmentToSemester(assignment, semester){
	semester.assignments.push(assignment._id);
	semester.save(function(err, updatedSemester){
			if (err) return handleError(err);
    		//res.send(updatedSemester);
		});
}
/* add a person */

function addPerson(modelPerson){
	var person = new Semester(modelPerson);
	person.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	});
	

}

function addPersonToSemester(person,semester){
	// If the person's role is defined as TA, student and professor, add the person to Semester
	if(person.role == "TA"){
		semester.TAs.push(person._id);
	}
	else if(person.role == "Professor"){
		semester.professors.push(person._id);
	}

	else(person.role == "Student"){
		semester.students.push(person._id);
	}
	semester.save(function(err, updatedSemester){
			if (err) return handleError(err);
    		//res.send(updatedSemester);
		});
}


/* assign role to a person */
function assignRole(role,person){
	person.role = role;
}

/* ------------------ Late cards ----------------- */

/* ------------------- Work ---------------------- */
function addWork(problem){
	// An unsubmitted work is created when the first submit button is clicked
	var work = new Work;
	work.problem = problem._id;
}

function addfiles(){
	// file info is added to work when files are uploaded

}

function addPartner(){
	// add a partner

}

function deletePartner(){
	// Do we want to notify the deleted partner?
}

function findASubmittedWork(){
	Work.findOne{workInfo: {submitted:true}, }
}









