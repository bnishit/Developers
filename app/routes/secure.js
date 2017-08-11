module.exports = function(router,passport,io){

	router.get('/dashboard',function(req,res){
		console.log('hello');
		res.render('hello.ejs');
	});

	router.get('/aadhar_conf',function(req,res){
		console.log('reaching');
		res.render('aadhar_conf.ejs');
	})

   	router.get('/*', function(req, res){
		res.redirect('/auth/login');
	}); 
}