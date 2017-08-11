var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	patient_id: String,
	Weight: Number,
	Height: Number,
	BMI: Number,
	Blood_Pressure: Number,
	Pulse_Rate: Number
	Disease: [{
		symptoms: String,
		Medicines: [{
			Name: String,
			Dose: Number 
		}],
	}]
},{ collection: 'reports' })

module.exports = mongoose.model('Patients', reportSchema);