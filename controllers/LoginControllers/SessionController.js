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

    //Initialize stored procedure to call
    var SQL = 'CALL CheckAccount(?)';

    // Calls the query, and handles the result in a callback function
    db.query(SQL, [username], function (err, results) {

        // If the passwords match, start a session and send user to dashboard.
        if (results[0].length > 0 && bcrypt.compare(password, results[0].password)) {
            var ress = results[0][0];
            sess.userId = ress.user_id;
            sess.userName = ress.username;
            sess.email = results[0].email;
            sess.firstName = ress.first_name;
            sess.lastName = ress.last_name;
            sess.roleId = ress.role_id;

            console.log(sess.roleId);
            var role_id = sess.roleId;
            if (role_id === 1 || role_id === 2) {
                message = 'Welcome ' + sess.firstName + ' To the BreatheHero Portal';
                res.render('Dashboard.ejs', {message: message});
            } else if (role_id === 3) {
                // Clinician portal
                res.render('ClinicianDash.ejs');
            } else if (role_id === 4) {
                //admin portal
                res.render('AdminDash.ejs');
            }

        }
        //If passwords don't match send error message and redirect to login page.
        else {
            message = 'Wrong Username or Password';
            res.render('Login.ejs', {message: message});
        }
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

    message = 'Sorry, your passwords do not match';
    if (password !== rpassword) {
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
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    var firstname = post.first_name;
    var lastname = post.last_name;
    var rpassword = post.confirm_password;
    var title = post.title;
    var clinic = post.clinic;
    var message = '';
    var SQL = 'Call StorePendingClinician(?,?,?,?,?,?,?)';
    var SQL2 = 'Call AccountExists(?)';

    if (password !== rpassword) {
        message = 'Sorry passwords do not match.';
        res.render('Login.ejs', {message: message})
    } else {

        bcrypt.genSalt(13, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                db.query(SQL2, [username], function (error, ress) {
                    console.log(ress);
                    if (ress[0][0] === undefined) {

                        db.query(SQL, [username, hash, email, firstname, lastname, title, clinic], function (err, results) {
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
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    var firstname = post.first_name;
    var lastname = post.last_name;
    var rpassword = post.confirm_password;
    var message = "";
    var SQL = "Call CreateAdmin(?,?,?,?,?,?)";

    if (password !== rpassword) {
        message = "Sorry Passwords do not match";
        res.render('AdminSignUp.ejs', {message: message})
    }

    bcrypt.genSalt(13, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            if (req.session.userId !== undefined) {
                db.query(SQL, [username, hash, email, firstname, lastname, 4], function (err, results) {
                    if (err !== null) {
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

/*
Destroys session on logout and redirects to login page.
 */

/**
 *
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    })
};

