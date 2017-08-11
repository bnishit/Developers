var mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
	Uid: String,
	Name: String,
	Blood: String,
	Gender: {type: String, enum: ["M", "F"]},
	Location: String,
	State: String,
	Dob: String
}, { collection: 'patients' });

module.exports = mongoose.model('Patients', patientSchema);