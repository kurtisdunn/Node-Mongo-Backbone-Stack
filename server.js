var express = require('express'),
	app = express(),
	path = require('path'),
	winston = require('winston'),
	expressWinston = require('express-winston'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	mongoSession = require('connect-mongo')(express),
	passport = require('passport'),
	session = require('session'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	colors = require('colors'),
	UAParser = require('ua-parser-js'),
	configDB = require('./app/config/database.js');

// routes ======================================================================
mongoose.connect(configDB.url);
mongoose.set('debug', false); // connect to our database
require('./app/config/passport.js')(passport);
// configuration ===============================================================

var parser = new UAParser();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.engine('html', cons.underscore);
	app.set('port', process.env.PORT || 3000);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/app/views');
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.json());
	app.use(express.cookieParser());
	app.use(express.urlencoded());
	app.use(express.session({
		store: new mongoSession(configDB.url),
		secret: '#,B{mH187YS#7K575YH6.+(k+IiT"rUWu|hwaAQIv4dc*$cg,`c&hL:~5T6[}08',
		saveUninitialized: true,
		resave: true
	}));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash());
}



// Logging ===============================================================
app.use(expressWinston.logger({
	transports: [
		new(winston.transports.File)({
			filename: __dirname + '/logs/access.log',
			meta: true,
			msg: "HTTP {{req.method}} {{req.url}}"
		})
	]
}));

require('./app/routes.js')(app, passport, parser);
require('./app/api.js')(app, passport);
app.use(express.static(__dirname + '/app/public'));


// launch ======================================================================
app.listen(app.get('port'))
console.log("This app is - LISTENING ON PORT > ".cyan.bold + app.get('port'));
console.log('mongoose.connection.readyState() '.grey.bold, mongoose.connection.readyState);
