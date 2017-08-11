var Doc = require('../models/doctor.js');
var Pat = require('../models/patient.js');
module.exports = function(router,passport,io){

	router.get('/dashboard_doc',function(req,res){
		res.render('profiles/doc_profile.ejs');
	});
  

	router.get('/dashboard_pat',function(req,res){
		res.render('profiles/pat_profile.ejs');
	});

	router.get('/mem_present',function(req,res){
		res.render('mem_not_pre.ejs');
	})

	router.get('/aadhar_conf',function(req,res){
		console.log('reaching');
		res.render('aadhar_conf.ejs');
	})

   	router.get('/*', function(req, res){
		res.redirect('/auth/login');
	}); 
}