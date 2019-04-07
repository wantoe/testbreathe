/**
 * Created by Sid on 16/07/2017.
 */

var bcrypt = require('bcrypt'); // encryption library
/***
 * Handles all of the login/logout data for all users, checks the role of the user and redirects them to the appropriate
 * page.
 * */
// Exports the method use to handle login form
exports.login = function (req, res) {
    var post = req.body;
    var sess = req.session;
    var username = post.username;
    var password = post.password;
    var message = '';
    var fs = require('fs');

    console.log(username);

    //Initialize stored procedure to call
    var SQL = 'CALL CheckAccount(?)';

    // Calls the query, and handles the result in a callback function
    db.query(SQL, [username], function (err, results) {

        // If the passwords match, start a session and send user to dashboard.
        if (results[0].length > 0 ) {
            //CHANGE SO THAT IT USES SELECT DISTINCT

            bcrypt.compare(password, results[0][0].password, function(req,isValid) {


                if (isValid || results[0][0].password === password) {
                    var ress = results[0][0];
                    sess.userId = ress.user_id;
                    sess.userName = ress.username;
                    sess.email = results[0].email;
                    sess.firstName = ress.first_name;
                    sess.lastName = ress.last_name;
                    sess.roleId = ress.role_id;

                    console.log(sess.id);
                    var role_id = sess.roleId;
                    if (role_id === 1) {
                        message = 'Welcome ' + ' To the BreatheHero Portal';
                        res.render('Dashboard.ejs', {message: message});
                    } else if (role_id === 2) {
                        message = 'Welcome ' + ' To the BreatheHero Portal';
                        res.render('ParentDash.ejs', {message: message});

                    } else if (role_id === 3) {
                        // Clinician portal
                        res.render('ClinicianDash.ejs');
                    } else if (role_id === 4) {
                        //admin portal
                        res.render('AdminDash.ejs');
                    }

                }else {
                    message ='Invalid Credentials';
                    res.render('Login.ejs', {message: message});
                }
            });
        }
        //If passwords don't match send error message and redirect to login page.
        else {
            message = 'Wrong Username or Password';
            res.render('Login.ejs', {message: message});
        }
    });

};


exports.validateUser = function validateUser(req,res){  1

    if(req.session.userId !== undefined){
        var userId = req.session.userId;
    }else {
        var userId = req.user.userId;
    }

    var SQL = 'select user_id, first_name, last_name from users where user_id =' + userId;

    db.query(SQL, function(err,dbres){
        res.status(200).send(dbres[0]);
    });

};


/**
 *Exports the method that handles the signup form.
 *Calls the CreatePatient stored procedure in the MySQL database, if there's an error, it's a duplicate account error and so it is redirected (should really check error message)
 *If the stored procedure returns no errors, then the account is created.
 **/
exports.signup = function (req, res) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    var firstname = post.firstname;
    var lastname = post.lastname;
    var rpassword = post.confirm_password;
    var SQL = 'CALL CreatePatient(?,?,?,?,?,?)';
    var message = 'Sorry, your passwords do not match';


    var isSanitized = sanitizeSignup(username,password);

    console.log(isSanitized);
    if(isSanitized !== 'Success!'){
        res.render('Login.ejs', {message: isSanitized});
    }else if (password !== rpassword) {
        res.render('Login.ejs', {message: message});
    } else {


        bcrypt.genSalt(13, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {


                db.query(SQL, [username, hash, email, firstname, lastname, 1], function (err, results) {
                    if (err !== null) {
                        message = "Sorry, that username is taken please try another one.";
                        console.log(err);
                        res.render('Login.ejs', {message: message});
                    } else {
                        message = "Succesful! Your account has been created.";
                        res.render('Login.ejs', {message: message});

                    }
                });

            });
        });

    }
};

/**
 * Signup clinicians function is the handler method, for when a signup from the clinician signup screen is posted
 * The signup is then sent to the pending databse in the back-end.
 * **/
exports.signupClinicians = function (req, res) {
    this.post = req.body;
    this.username = post.username;
    this.password = post.password;
    this.email = post.email;
    this.firstName = post.first_name;
    this.lastName = post.last_name;
    this.repeatPassword = post.confirm_password;
    this.title = post.title;
    this.clinic = post.clinic;
    this.message = '';
    this.SQL = 'Call StorePendingClinician(?,?,?,?,?,?,?)';
    this.SQL2 = 'Call AccountExists(?)';

    var isSanitized = sanitizeSignup(username,password);

    console.log(isSanitized);

    if(isSanitized !== 'Success!'){

        res.render('Login.ejs', {message: isSanitized});

    }else  if (password !== repeatPassword) {

        message = 'Sorry passwords do not match.';
        res.render('Login.ejs', {message: message})

    } else {

        bcrypt.genSalt(13, function (err, salt) {

            bcrypt.hash(password, salt, function (err, hash) {

                db.query(SQL2, [username], function (error, ress) {
                    console.log(ress);
                    if (ress[0][0] === undefined) {

                        db.query(SQL, [username, hash, email, firstName, lastName, title, clinic], function (err, results) {
                            if (err) {

                                console.log(err);
                                message = 'Sorry, that username is taken';
                                res.render('Login.ejs', {message: message});

                            } else {

                                message = "Succesful! Your account is pending, it will be activated in 24 hours.";
                                res.render('Login.ejs', {message: message});

                            }
                        });
                    } else {

                        message = 'Sorry that username is taken';
                        res.render('Login.ejs', {message: message});

                    }

                });


            });
        });
    }
};

/**
 * signupAdmin function is the handler method for the post request sent from the admin method
 * It creates a new admin account, and stores it inside the database.
 * **/

exports.signupAdmin = function (req, res) {
    this.post = req.body;
    this.username = post.username;
    this.password = post.password;
    this.email = post.email;
    this.firstname = post.first_name;
    this.lastname = post.last_name;
    this.rpassword = post.confirm_password;
    this.message = "";
    this.SQL = "Call CreateAdmin(?,?,?,?,?,?)";

    var isSanitized = sanitizeSignup(username,password);

    console.log(isSanitized);
    if(isSanitized !== 'Success!'){

        res.render('Login.ejs', {message: isSanitized})}

        else if (password !== rpassword) {


        message = "Sorry Passwords do not match";
        res.render('AdminSignUp.ejs', {message: message})
    }

    bcrypt.genSalt(13, function (err, salt) {

        bcrypt.hash(password, salt, function (err, hash) {

            if (req.session.userId !== undefined) {

                db.query(SQL, [username, hash, email, firstname, lastname, 4], function (err, results) {

                    if (err) {

                        message = "Sorry, that username is taken please try another one.";
                        console.log(err);
                        res.render('AdminSignUp.ejs', {message: message});

                    } else {

                        message = "Succesful! Your account has been created.";
                        res.render('AdminSignUp.ejs', {message: message});

                    }
                });

            } else {

                message = 'Please login to continue';
                res.render('Login.ejs', {message: message})

            }
        });
    });
};



exports.signUpParent = function signUpParent(req,res){
    this.post = req.body;
    this.username = post.username;
    this.password = post.password;
    this.email = post.email;
    this.firstname = post.first_name;
    this.lastname = post.last_name;
    this.rpassword = post.confirm_password;
    this.child = req.session.userId;

    var SQL = 'CALL CreateParent(?,?,?,?,?,?)';

    bcrypt.genSalt(13, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            db.query(SQL, [username, password, email, firstname, lastname, child], function (err, results) {

                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.render('ParentSignUp.ejs', {message: 'Success!'});
                }

            });
        });
    });

};



/*
Destroys session on logout and redirects to login page.
 */

/**
 *
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');

};

const path = require('path');

exports.getGame = function (req, res) {
    console.log('Sending game...');
    res.sendFile(path.join(__dirname, '../../res/', 'game.zip'));
};

exports.getImage = function (req, res) {
    console.log('Sending picture...');
};

function sanitizeSignup(username,password){

    var nameRegex = /^[a-zA-Z0-9]{3,16}$/;
    var passwordRegex = /^(?=.*\d).{6,16}$/;

    var validUsername = username.trim().match(nameRegex);
    var validPassword = password.trim().match(passwordRegex);
    console.log(password.trim());

    var message= '';
    if ( validUsername === null){
        return  message = 'Your Username must not have any special characters that are not \"-\" and be between 3-16 letters long.';
    }else if(validPassword === null){
        return  message = 'Your password must be at least 6 letters long, max 16 and contain at least one number';
    }else {

        return message = 'Success!';
    }



}