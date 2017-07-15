33
/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./controllers/LoginControllers') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/index.js') // Path to main login page file.
    , http = require('http')
    , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'splatsid',
    password : 'Sidharth123',
    database : 'BreatheHero'
});

connection.connect();

global.db = connection;

// Sets up the file so that express JS can load it onto the server
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.use("/public",express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.listen(8080)


app.get('/', routes.index);//call for login page.
