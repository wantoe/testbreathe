33
/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./controllers/LoginControllers') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/user') // Path to main login page file.
    , http = require('http')
    , path = require('path');
//var methodOverride = require('method-override');
var mysql      = require('mysql');
var bodyParser=require('body-parser');
var app = express();
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'splatsid',
    password : 'Sidharth123',
    database : 'breathehero'
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


app.get('/', routes.index);//call for login page

// REFACTOR THIS INTO LOGIN METHOD
app.post('/login', function(req,res){
    var post = req.body;

    var username = post.username;
    var password = post.password;

    var SQL = 'CALL CheckAccount(?,?)'

    db.query(SQL,[username,password],function(err,results){
        if(results[0].length > 0){
            console.log(results);
        }else {
            message = 'Wrong Username or Password';
            res.render('Login.ejs',{message : message});
        }
    });

});//call for login post


// REFACTOR INTO IT'S OWN FILE LATER
app.post('/signup', function(req,res){
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    var firstname = post.firstname;
    var lastname = post.lastname;
    var rpassword = post.confirm_password;

    var SQL = 'CALL CreatePatient(?,?,?,?,?,?)';

    console.log(password);
    console.log(rpassword);


    if(password === rpassword) {
        try {
            connection.query(SQL, [username, password, email, firstname, lastname, 1])
        } catch (err){
            console.log(err.message);
        }
        message = "Succesful! Your account has been created.";
        res.render('Login.ejs', {message: message});
    }else {
        message = "Passwords do not match, Try Again"

    }

});//call for login post

