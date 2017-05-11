var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

var db = require('./models')

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var path = require('path');
var session = require('express-session');
var CurrentUser = {};


// supply a session 'secret' to hash the session (security measure)
app.use(session({secret: "mySecret"}));
// initialize the passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // null is for errors
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "440677098615-i4n1hiqtg810eglrsa810799q6kduatr.apps.googleusercontent.com",
    clientSecret: "YqVPUeNuejPk3vxiWHLVx7tQ",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
			// console.log(accessToken);
			cb(null, accessToken, profile, refreshToken);
      // localStorage.setItem('given name', JSON.stringify(profile.name.given_name));
      // localStorage.setItem('user id', JSON.stringify(profile.id));
      var given_name = profile.name.givenName;
      var user_id = profile.id;
      CurrentUser["user_id"] = user_id;
      CurrentUser["given_name"] = given_name;
      app.get("/api/user", function(req,res){
        res.json(CurrentUser);
      });
  }
));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

// Serve static content for the app from the “public” directory in the application directory.
app.use(express.static(process.cwd() + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// This route should match the callbackURL or, "Redirect URI" (I think that's what google calls it)
// Once google response and hits the callbackURL the user will either hit the /success route or be directed back to the home page
app.get('/auth/google/callback', passport.authenticate('google', {  
  successRedirect: '/success',
  failureRedirect: '/',
}));

// users who are succesfully authenticated will be redirected to the success route
// notice that we pass in the custom 'isAuthenticated' middleware that we created below to check if the user hitting this route is authenticated 
app.get('/success', isAuthenticated, function(req, res) {
	res.sendFile(path.join(__dirname + '/views/success.html'));
});

// users who are not succesfully authenticated will hit this route
app.get('/fail', function(req, res) {
  // console.log(req.user); // check the console and you'll see that req.user is undefined
	res.sendFile(path.join(__dirname + '/views/fail.html'));
});

// passport lets us use the req.logout() method to end the current session
// when the user is logged out they are redirected back to the homepage
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// here we create our own express middleware function to check if the user object exists on req
function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    // if req.user does not exist redirect them to the fail page.  Here you can either redirect users back to the login page
    res.redirect('/fail');
};

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var routes = require("./controllers");

// app.use("/", routes);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(3000, function() {
    console.log('Server listening on localhost:3000')
  });
});