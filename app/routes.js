// app/routes.js

module.exports = function(app, passport, parser) {
	var express = 	require('express')
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
	app.get('/', isLoggedIn, function(req, res, next) {

		req.session.lastPage = '/';
	    if(req.session.lastPage) {
	      console.log('Last page was: ' + JSON.stringify(req.session) + '. ');
	    }
		//app.engine('html', ejs.__express);
		app.set('views', __dirname + '/app/public');
		//res.render('index.html',{title:"my home page", url:req.url});
		res.sendfile(__dirname + '/public/index.html');
	});
	app.get('/info', function(req, res) {
		var ua = req.headers['user-agent']; 	
		var q = parser.setUA(ua).getResult();
	  res.json(q);
	});
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res, next) {
		req.session.lastPage = '/';
	    if(req.session.lastPage) {
	      console.log('Last page was: ' + req.session.lastPage + '. ');
	    }
		app.set('views', __dirname + '/views');
		res.render('login.html', { message: req.flash('loginMessage') }); 
	});
	
	// process the login form
	// app.post('/login', do all our passport stuff here);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res, next) {
		req.session.lastPage = '/signup';
	    if(req.session.lastPage) {
	      console.log('Last page was: ' + req.session.lastPage + '. ');
	    }
		// render the page and pass in any flash data if it exists
		res.render('../views/signup.html', { message: req.flash('signupMessage') });
	});
	

	// process the signup form
	// app.post('/signup', do all our passport stuff here);
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res, next) {
		req.session.lastPage = '/profile';
	    if(req.session.lastPage) {
	      console.log('Last page was: ' + req.session.lastPage + '. ');
	    }
		res.render('../views/profile.html', {
			user : req.user // get the user out of session and pass to template
		});
	});
	

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res, next) {
		req.session.lastPage = '/logout';
	    if(req.session.lastPage) {
	      console.log('Last page was: ' + req.session.lastPage + '. ');
	    }
		req.logout();
		res.redirect('/');
	});



};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
	
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
