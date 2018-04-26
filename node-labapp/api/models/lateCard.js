var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lateCardSchema = new Schema({
	_id: Schema.Types.ObjectId,
	person: {
		type: Schema.Types.ObjectId,
		ref:'Person'
	}
	semester: {
		type: Schema.Types.ObjectId,
		ref:'Semester'
	}
	usedCardInfo: [{
		type: Schema.Types.ObjectId,
		ref:'Work',
		number: Number
	}],
	totalCards: Number,
	remainingCards: Number
});

module.exports = mongoose.model( 'LateCardSchema', lateCardSchema );