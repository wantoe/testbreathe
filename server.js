var express = require('express')
    , routes = require('./controllers/LoginControllers/mainpage') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/user.js') // Path to main login page file.
    , http = require('http')
    , path = require('path')
    , apiRoutes = require('./controllers/APIControllers/apiController');
var fs = require('fs');
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
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

//Start up the website
app.listen(port);



app.get('/', routes.index);//call for main page

app.post('/login', user.login);//call for login post

app.post('/signup', user.signup);//call for signup post

//Logout message
app.get('/logout', user.logout);

app.post('/api', apiRoutes.sentData );

app.get('/api',apiRoutes.getData);

app.get('/datasubmit',user.senddata);

app.get('/dashboard',user.dashboard);
