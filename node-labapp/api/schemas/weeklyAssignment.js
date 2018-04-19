var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weeklyAssignmentSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	description: String,
	problems: [{
		type: Schema.Types.ObjectId,
		ref: 'Problem'
	}],
	startAt: Date
});

module.exports = mongoose.model( 'WeeklyAssignment', weeklyAssignmentSchema );