var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workSchema = new Schema({
	_id: Schema.Types.ObjectId,
	problem: {
		type: Schema.Types.ObjectId,
		ref: 'Problem'
	}
	lastSubmitted: Date,
	partners: [{
		type: Schema.Types.ObjectId,
		ref: 'Person'
	}],
	files: [{
		url: String,
		flag: String
	}],
	grade: Number,
	assignedTA: [{ 
		type:Schema.Types.ObjectId,
		ref:'Person'
	}],
	workInfo:{
		submitted: boolean,
		graded: boolean
	},
	comments: [String]
});

module.exports = mongoose.model( 'Work', workSchema );