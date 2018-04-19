var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auditLogSchema = new Schema({
	_id: Schema.Types.ObjectId,
	person: {
		type: Schema.Types.ObjectId,
		ref:'Person'
	},
	module: String,
	forcname: String,
	args: String,
	datetime: Date,
	localIP: String,
	hostMachine: String
});

module.exports = mongoose.model( 'AuditLog', auditLogSchema );