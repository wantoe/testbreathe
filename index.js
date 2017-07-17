33;
/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./controllers/LoginControllers') // Path to the login Controllers
    , user = require('./controllers/LoginControllers/user') // Path to main login page file.
    , http = require('http')
    , path = require('path');

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
var bcrypt = require('bcrypt');
var session = require('express-session');
connection.connect();

global.db = connection;

module.exports = connection;
module.exports = app;

// Sets up the file so that express JS can load it onto the server
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.use("/public",express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//Middleware
app.listen(8080);


app.get('/', routes.index);//call for login page

// REFACTOR THIS INTO LOGIN METHOD
app.post('/login', function(req,res){
    var post = req.body;
    var sess = req.session;
    var username = post.username;
    var password = post.password;

    var SQL = 'CALL CheckAccount(?)';

    db.query(SQL,[username],function(err,results){
        if(results[0].length > 0 && bcrypt.compare(password,results[0].password)){
            var ress = results[0][0];
               console.log(ress.username);
              sess.userId = ress.user_id;
              sess.userName = ress.username;
              sess.email = results[0].email;
              sess.firstName = ress.first_name;
              sess.lastName = ress.last_name;

            message = 'Welcome ' + sess.firstName + ' To the BreatheHero Portal';
            res.render('Dashboard.ejs' ,{message:message});

        }
        else {
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

    bcrypt.genSalt(13, function (err,salt) {
        bcrypt.hash(password, salt, function (err, hash) {

                connection.query(SQL, [username, hash, email, firstname, lastname, 1], function(err,results){
                    if(err !== null){
                        message = "Sorry, that username is taken please try another one."

                        res.render('Login.ejs',{message: message});
                    }else {
                        message = "Succesful! Your account has been created.";
                        res.render('Login.ejs', {message: message});

                    }
                });

        });
    });



});//call for login post


//Logout message
app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        res.redirect("/");
    })
});

