var express = require('express')
    , routes = require('./controllers/LoginControllers/mainpage') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/SessionController.js') // Path to main login page file.
    , apiRoutes = require('./controllers/APIControllers/apiController')
    , navigation = require('./controllers/LoginControllers/NavigationController')
    , ClinicianPortal = require('./controllers/APIControllers/ClinicianDataController')
    , http = require('http')
    , path = require('path')
;

const passport = require('passport');

var mysql = require('mysql2');
var bodyParser = require('body-parser');
var app = express();



var connection = mysql.createConnection({
    host: 'breathehero.mysql.database.azure.com',
    user: 'BreatheHeroAdmin@breathehero',
    password: 'BreatheHero2017',
    database: 'breathehero',
    ssl: true
});


var bcrypt = require('bcrypt');
var session = require('express-session');
connection.connect();

global.db = connection;

//Specify a port
var port = process.env.port || 8080;

//Serve up files in public folder
app.use('/', express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use("/public", express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./Services/AuthenticationService') (passport);
//Start up the website
app.listen(port);



app.get('/', routes.index);//call for main page

app.post('/login', passport.authenticate('local-login', { failureRedirect: '/',failureFlash: true }), user.login);//call for login post

app.post('/signup', user.signup);//call for signup post

app.get('/logout', user.logout);

app.post('/api/userdata',ensureAuthenticated, apiRoutes.sentData );

app.get('/api/userdata', ensureAuthenticated,apiRoutes.getData);

app.get('/datasubmit', ensureAuthenticated, navigation.senddata);

app.get('/api/ClinicalData', ensureAuthenticated, ClinicianPortal.getUserInfo);


app.get('/api/PendingClinicians', ensureAuthenticated,  ClinicianPortal.getPendingClincians);

app.post('/ClinicianSignup', user.signupClinicians);

app.post('/AdminSignup', ensureAuthenticated,  user.signupAdmin);

app.get('/AdminSignup', ensureAuthenticated, navigation.signUpAdmin);

app.get('/dashboard', ensureAuthenticated, navigation.dashboard);

app.get('/AdminDash', ensureAuthenticated,  navigation.adminDash);

app.get('/SignUpPhysician',   navigation.clinicianSignup);

app.get('/ParentSignUp', ensureAuthenticated, navigation.parentSignUp);

app.get('/api/me',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.json(req.user);
    });

function ensureAuthenticated(req, res, next) {
    console.log('ensureAuthenticated');
    if (req.isAuthenticated()) {
        return next();
    }
    passport.authenticate('basic',{session: false} )(req,res,next);}