/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./controllers/LoginControllers/mainpage') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/user.js') // Path to main login page file.
    , http = require('http')
    , path = require('path')
    , apiRoutes = require('./controllers/APIControllers/apiController');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'splatsid',
    password: 'Sidharth123',
    database: 'breathehero'
});
var bcrypt = require('bcrypt');
var session = require('express-session');
connection.connect();

global.db = connection;


// Sets up the file so that express JS can load it onto the server
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.use("/public", express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

//Middleware
app.listen(80);


app.get('/', routes.index);//call for main page

app.post('/login', user.login);//call for login post

app.post('/signup', user.signup);//call for signup post

//Logout message
app.get('/logout', user.logout);

app.post('/api', apiRoutes.sentData );

app.get('/api',apiRoutes.getData);

