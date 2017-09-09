/**
 * Created by Sid on 16/07/2017.
 */

var bcrypt = require('bcrypt'); // encryption library
/***
 * Handles all of the login/logout data for all users, checks the role of the user and redirects them to the appropriate
 * page.
 * */
// Exports the method use to handle login form
exports.login = function loginUser(req, res) {
    var userId = req.session.passport.user.id;
    var roleId = req.session.passport.user.roleId;

    console.log('HEY');
    switch (roleId){
        case 1:
        case 2:
            message = 'Welcome ' + ' To the BreatheHero Portal';
            res.render('Dashboard.ejs', {message: message});
            break;
        case 3:
            res.render('ClinicianDash.ejs');
            break;
        case 4:
            res.render('AdminDash.ejs');
            break;

    }
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

    if (password !== repeatPassword) {
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
    req.logout();
    res.redirect('/');


};

