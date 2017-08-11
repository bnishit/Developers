var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
	uid: String,
	Name: String,
	Gender: {type: String, enum: ["M", "F"]},
	Location: String,
	Dob: String,
	Pos: String,
	Spcl: String,
    Deg: String,
    Exp: Number,
    Fee: Number,
    Clinics: [{
    	Name: String,
    	Address: String
    }]
},{ collection: 'doctor' })

module.exports = mongoose.model('Doctors', doctorSchema);