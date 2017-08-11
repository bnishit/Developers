var LocalStrategy = require('passport-local').Strategy;
var Pat = require('../models/patient.js');
var Doc = require('../models/doctor.js');
var configAuth = require('./auth');

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		/*Stud.findById(id, function(err, user){
		  if(user){
			done(err, user);
		  }
		  else{
				Prof.findById(id, function(err, user){
					done(err, user);
				});	
		  }
		});	*/
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'Aadh',
		//passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, done){
		process.nextTick(function(){
			Doc.findOne({'uid': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', '<div class="alert alert-danger"><b>That email already taken</b></div>'));
				}
               else
              {
				Pat.findOne({'uid': email}, function(err, user){
					if(err)
						return done(err);

					if(user){
					return done(null, false, req.flash('signupMessage', '<div class="alert alert-danger"><b>That email already taken</b></div>'));
				    }

				    else
				    {
                        if(req.body.username_doc){
                        	// He is a Doctor
							var newUser = new Doc();

							newUser.uid = req.body.Aadh;
							newUser.Name = req.body.username_doc;
							newUser.Gender = req.body.gender;
		                    newUser.Location = req.body.clc_add;
		                    newUser.Pos = req.body.position;
		                    newUser.Spcl = req.body.spcl;
		                    newUser.Deg = req.body.deg;
		                    newUser.Exp = req.body.exp;
		                    newUser.Fee = req.body.clc_fee;

							newUser.save(function(err){
								console.log('doctor saved');
							    return done(null, newUser, req.flash('signupMessage', '<div class="alert alert-success"><b>Email is sent. Check your Email Id</b></div>'));
							});                        	
                        }
                        if(req.body.pat_name){
                        	// He is a Patient
                        }

						}				    	
		
				});
		      }
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'uid',
			passwordField: 'phno',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
		var client = require('twilio')(
		  'ACdb2e6415edd91a9a32497c0448aff393',
		  '95a753011bf2326650970350a927d9c0'
		);
		 
		client.messages.create({
		  from: '+14078908708',
		  to: password,
		  body: "Hello from Sarthak Patidar"
		}, function(err, message) {
		  if(err) {
		    console.error(err.message);
		  }
		});
			/* var m = email.split('@',2);
			 if ( m[1] == "srmuniv.edu.in"){
				Stud.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user){	
						return done(null, false, req.flash('loginMessage', '<div class="alert alert-danger"><b>p No User found or Please verify your account if not done yet</b></div>'));
					}
					if(!user.validPassword(password)){
							return done(null, false, req.flash('loginMessage', '<div class="alert alert-danger"><b>invalid password</b></div>'));
				    }
				    return done(null, user);
				});	
              }
             if ( m[1] == "ktr.srmuniv.ac.in"){

				Prof.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user){	
						return done(null, false, req.flash('loginMessage', '<div class="alert alert-danger"><b>p No User found or Please verify your account if not done yet</b></div>'));
					}
					if(!user.validPassword(password)){
							return done(null, false, req.flash('loginMessage', '<div class="alert alert-danger"><b>invalid password</b></div>'));
				    }
				    return done(null, user);
				});	
			  } */							
		  });
		}
	));
};