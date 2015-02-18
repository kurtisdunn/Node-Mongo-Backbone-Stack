// app/routes.js

module.exports = function(app,passport) {
	
	var colors 		= require('colors'),
		mongoose	= require('mongoose'),
	 	posts       = require('./models/post.js');
	
	
	app.get('/api', isLoggedIn, function (req, res) {  
			res.send('<p>RESTful API is running</p>'); 
	});  
	
	
	app.get('/api/post', isLoggedIn, function (req, res){
	  return PostModel.find(function (err, posts) {
	    if (!err) {
	      return res.send(posts);
	    } else {
	      return console.log(err);
	    }
	  });
	});
	
	app.post('/api/post', isLoggedIn, function (req, res){
	  var post;
	  console.log("POST: ".bold.grey);
	  console.log(req.body);
	  post = new PostModel({
	    heading: req.body.heading, 
	    sub_heading:  req.body.sub_heading, 
	    body:  req.body.body, 
	    footer:  req.body.footer, 
		category:  req.body.category
	  });
	  post.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(post);
	});
	
	app.get('/api/post/:id', isLoggedIn, function (req, res){
	  return PostModel.findById(req.params.id, function (err, post) {
	    if (!err) {
	      return res.send(post);
	    } else {
	      return console.log(err);
	    }
	  });
	});
	
	app.put('/api/post/:id', isLoggedIn, function (req, res){
	  return PostModel.findById(req.params.id, function (err, post) {
  	    post.heading = req.body.heading;
  	    post.sub_heading = req.body.sub_heading;
  	    post.body = req.body.body;
  	    post.footer = req.body.footer;
  		post.category = req.body.category;
	    return post.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(post);
	    });
	  });
	});
	
	app.delete('/api/post/:id', isLoggedIn, function (req, res){
	  return PostModel.findById(req.params.id, function (err, post) {
	    return post.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});
};





// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}
