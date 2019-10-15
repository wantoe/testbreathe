var express = require('express')
    , routes = require('./controllers/LoginControllers/mainpage') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/SessionController.js') // Path to main login page file.
    , apiRoutes = require('./controllers/APIControllers/apiController')
    , navigation = require('./controllers/LoginControllers/NavigationController')
    , ClinicianPortal = require('./controllers/APIControllers/ClinicianDataController')
    ,flash = require('connect-flash')
    , http = require('http')
    , path = require('path')
    ,parent = require('./controllers/APIControllers/ParentController')
    ,validateClinicians = require('./controllers/APIControllers/ClinicianValidationController')
    , captcha = require('./Services/CaptchaService')
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
app.use(flash());

require('./Services/AuthenticationService') (passport);
//Start up the website
app.listen(port);


/**
 * Posting to the ValiadateClinians endpoint, so that you are able to validate clinicians */
app.post('/api/ValidateClinicians', validateClinicians.ValidateClinicians);

/**
 * Makes a call to the main page so that you can access it.
 */
app.get('/', routes.index);//call for main page

/**
 * When you are a logged in from a parent, it allows you to access childs data.
 */
app.get('/api/child', parent.GetChildData);

/**
 * Makes a call to login.
 */
app.post('/login', user.login);//call for login post

/**
 * Allows you to sign up as a regular user, have to go through captcha first.
 */
app.post('/signup',captcha.checkCaptcha, user.signup);//call for signup post

/**
 * Logout method, erases the session.
 */
app.get('/logout', user.logout);

/**
 * Allows you to post to the patient's database, either from the portal or through a standalone client.
 */
app.post('/api/userdata',ensureAuthenticated, apiRoutes.sentData );

/**
 * Allows you to retrieve patient data.
 */
app.get('/api/userdata', ensureAuthenticated, apiRoutes.getData);

/**
 *  Takes you to the client page so that you can submit data.
 */
app.get('/datasubmit', ensureAuthenticated, navigation.senddata);

/**
 *  Allows you to get information about the specified user if you are a clinician.
 */
app.get('/api/ClinicalData', ensureAuthenticated, ClinicianPortal.getUserInfo);

/**
 * Tells you the users specific requirements of each user.
 */
app.get('/api/UserRequirements', ensureAuthenticated, apiRoutes.getUserRequirements);

/**
 * Allows you to change a user's requirements.
 */
app.post('/api/UserRequirements',ensureAuthenticated, ClinicianPortal.UpdateUserData);

/**
 * Allows you to check how much of the weekly quota a user has completed.
 */
app.get('/api/WeeklyQuota',ensureAuthenticated, apiRoutes.satisfiedHours);

/**
 * Allows you to check who the pending clinicians are (Waiting for approval)
 */
app.get('/api/PendingClinicians', ensureAuthenticated,  ClinicianPortal.getPendingClincians);

/**
 * Allows you to check all accounts.
 */
app.get('/api/AllAccounts', ensureAuthenticated, ClinicianPortal.getAllAccounts);

/**
 * Allows the game to retrieve the last known session for a user
 */
app.get('/api/sessionTime', ensureAuthenticated, apiRoutes.getLatestSession);

/**
 * When the clinician wanting to sign up has filled their form, they complete the captcha and send it to this endpoint.
 */
app.post('/ClinicianSignup',captcha.checkCaptcha, user.signupClinicians);

/**
 * Allows admin accounts to be created using the signup form
 */
app.post('/AdminSignup', ensureAuthenticated,  user.signupAdmin);

/**
 * Allows you to navigate to the admin signup page
 */
app.get('/AdminSignup', ensureAuthenticated, navigation.signUpAdmin);
/**
 * Navigation to the user dashboard
 */
app.get('/dashboard', ensureAuthenticated, navigation.dashboard);
/**
 * Allows the logged in admin to navigate to the admindash page.
 */
app.get('/AdminDash', ensureAuthenticated,  navigation.adminDash);

/**
 * Allows the logged in admin to login as another selected user.
 */
app.post('/api/loginAs', ensureAuthenticated, navigation.loginAs);

/**
 * Allows you to navigate to the clinician signup page
 */
app.get('/SignUpPhysician',   navigation.clinicianSignup);

/**
 * Navigate from a patient to the parentsignup page
 */
app.get('/ParentSignUp', ensureAuthenticated, navigation.parentSignUp);

/**
 * Navigate from a clinician to the patient registration page
 */
app.get('/SignUpPatient', ensureAuthenticated, navigation.signUpPatient);

/**
 * Post the completed patient signup form
 */
app.post('/SignUpPatient', ensureAuthenticated, user.signUpPatient);

/**
 * Post the completed parent sign up form
 */
app.post('/ParentSignUp',ensureAuthenticated,user.signUpParent);

/**
 * Allows the cliinician to navigate to patient settings.
 */
app.get('/UserSettingsDashboard',ensureAuthenticated, navigation.patientSettingsDashboard);

/**
 * Allows a parent to navigate to their dashboard.
 */
app.get('/ParentDash', ensureAuthenticated, navigation.parentdashboard);
/**
 * Allows a clinician to navigate to their dashboard.
 */
app.get('/ClinicianDash',ensureAuthenticated, navigation.clinicianDash);
/**
 * Allows the admin to decline clinicians
 */
app.post('/api/DeclineClinicians', validateClinicians.DeclineClinicians);

/**
 * This function validates the user data.
 */
app.get('/api/ValidateUser', ensureAuthenticated, user.validateUser);

/**
 * This function allows the user to download the game after clicking the correct button.
 */
app.get('/api/game.zip', ensureAuthenticated, user.getGame);

/**
 * This is a test, to check if resources are being exposed correctly.
 */
app.get('/api/BreatheHeroLogo-v2.png', ensureAuthenticated, user.getImage);

/**
 * This is the endpoint that updates the game availability field in patients.
 */
app.post('/api/updateGameStatus', ensureAuthenticated, user.updateGameStatus);

/**
 * This is the endpoing for obtaining the current status of access for a user to the game.
 */
app.get('/api/getGameStatus', ensureAuthenticated, user.returnGameStatus);

app.post('/api/deleteAccount', ensureAuthenticated, user.deleteAccount);

/**
 * C
 * @param req The request to check authenticated
 * @param res The response to provide
 * @param next The callback Funtion
 * @returns {*}
 */
function ensureAuthenticated(req, res, next) {
    console.log('ensureAuthenticated');
    if (req.session.userId !== undefined) {
        console.log('next');
        return next();
    }


    passport.authenticate('basic',{session: false} )(req,res,next);}