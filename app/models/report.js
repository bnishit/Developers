var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	patient_id: String,
	Pulse_Rate: Number,
	Disease: [{
		name: String,
		symptoms: String,
		Medicines: String
	}],
	Date: {type: Date, default: Date.now()}
},{ collection: 'reports' })

module.exports = mongoose.model('Reports', reportSchema);