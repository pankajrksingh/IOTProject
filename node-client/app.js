var express = require('express'), 
	bodyParser = require('body-parser'), 
	cookieParser = require( 'cookie-parser' ),
	passport  = require( 'passport' ),
	session = require( 'express-session' ),
	RedisStore = require( 'connect-redis' )( session ),
	GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy,
	multer = require('multer'),
	viewRouter = require('./routes/views'),
	apiRouter = require('./routes/api'),
	config = require('./helper/config'),
	constants = require('./helper/constants');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
    clientID:     config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.callbackURL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

  	/*console.log(profile);*/
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
	
var app = express();

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/** Parsing url* */
app.use(bodyParser.urlencoded({
	extended : true
}));
/** Parsing JSON* */
app.use(bodyParser.json());
app.use(cookieParser()); 
/** Parsing multi-form* */
app.use(multer());

app.use( session({ 
	secret: 'cookie_secret',
	name:   'kaas',
	store:  new RedisStore({
		host: '127.0.0.1',
		port: 6379
	}),
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));

/** view engine setup **/
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'ejs');

app.use( passport.initialize());
app.use( passport.session());


/** API Middleware* */
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

app.get( '/auth/google/callback', 
    	passport.authenticate( 'google', { 
    		failureRedirect: '/',successRedirect : '/home'}));


app.use('/', viewRouter);
app.use('/api', apiRouter);


// start server on the specified port and binding host
app.listen(3000, appEnv.bind, function() {
	// print a message when the server starts listening
  console.log("server starting on 3000" );
});