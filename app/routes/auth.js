
  function buildResultSet(docs){
    var result = [];
    for(var object in docs){
      result.push(docs[object]);
    }
    return result;
   }

module.exports = function(router, passport,io){
  //localhost:8080/auth/

  router.get('/error_404',function(req,res){
    res.send('Error 404 page');
  });
  
  router.get('/login', function(req, res){

      res.render('auth_files/signin.ejs', { message: req.flash('loginMessage') });

  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

 //localhost:8080/auth/signup
  router.get('/signup_doc', function(req, res){
    var j=0;
    if(j<1){
      io.on('connection',function(socket){
        console.log('connection established');
      });
      res.render('auth_files/doc_signup.ejs',{ message: req.flash('signupMessage')} );
      j= j+1;      
    }
  });

  router.get('/signup_pat',function(req,res){
    var j=0;
    if(j<1){
      io.on('connection',function(socket){
        console.log('connection established');
      });
      res.render('auth_files/pat_signup.ejs',{ message: req.flash('signupMessage')} );
      j= j+1;      
    }

  });


  router.post('/signup_pat', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/signup_pat',
    failureFlash: true
  }));

  router.post('/signup_doc', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/signup_doc',
    failureFlash: true
  }))

  /*router.get('/setup/stud_setup',function(req,res){
         res.render('setup/stud_setup.ejs', { user: req.user});
  });

  router.get('/setup/prof_setup',function(req,res){
         res.render('setup/prof_setup.ejs', { user: req.user});
  }); */

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/auth/login');
  });

    router.get('/search_member', function(req, res) {
     var regex = new RegExp(req.query["term"], 'i');
     var stud_query = Stud.find({'local.firstname': regex},{ 'local.firstname': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).select({ local: 1, s_Id: 1 }).limit(20);
     var prof_query = Prof.find({'local.firstname': regex},{ 'local.firstname': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).select({ local: 1, p_Id: 1 }).limit(20);    

    // Execute query in a callback and return users list
    stud_query.exec(function(err, studs) {
        if (!err) {
             prof_query.exec(function(err,profs){
             if(!err){
                  console.log(profs);
                  var proflist = buildResultSet(profs);
                   
                   // Method to construct the json result set
                   var studlist = buildResultSet(studs);
                   var result = studlist.concat(proflist);
                   res.send(result, {
                      'Content-Type': 'application/json'
                   }, 200);                  
                }
            });
        } 
        else {
           res.send(JSON.stringify(err), {
              'Content-Type': 'application/json'
           }, 404);
        }
     });

  }); 
};