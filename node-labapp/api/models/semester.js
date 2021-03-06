var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semesterSchema = new Schema({
	_id: Schema.Types.ObjectId,
	course: String,
	name: String,
	startingDate: Date,
	defaultLateCards: Number,
	assignments: [{ type:Schema.Types.ObjectId,
					ref:'Assignment'}],
	professors: [{ type:Schema.Types.ObjectId,
					ref:'Person'}],
	tas: [{ type:Schema.Types.ObjectId,
					ref:'Person'}],
	students: [{ type:Schema.Types.ObjectId,
					ref:'Person'}]
});

module.exports = mongoose.model( 'Semester', semesterSchema );