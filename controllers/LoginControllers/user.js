/**
 * Created by Sid on 16/07/2017.
 */

var bcrypt = require('bcrypt'); // encryption library


// Exports the method use to handle login form
exports.login = function (req, res) {
    var post = req.body;
    var sess = req.session;
    var username = post.username;
    var password = post.password;
    var message = '';

    //Initialize stored procedure to call
    var SQL = 'CALL CheckAccount(?)';

    // Calls the query, and handles the result in a callback function
    db.query(SQL, [username], function (err, results) {

        console.log(results);
        // If the passwords match, start a session and send user to dashboard.
        if (results[0].length > 0 && bcrypt.compare(password, results[0].password)) {
            var ress = results[0][0];
            console.log(ress.username);
            sess.userId = ress.user_id;
            sess.userName = ress.username;
            sess.email = results[0].email;
            sess.firstName = ress.first_name;
            sess.lastName = ress.last_name;

            message = 'Welcome ' + sess.firstName + ' To the BreatheHero Portal';
            res.render('Dashboard.ejs', {message: message});

        }
        //If passwords don't match send error message and redirect to login page.
        else {
            message = 'Wrong Username or Password';
            res.render('Login.ejs', {message: message});
        }
    });

}

/*
Exports the method that handles the signup form.
Calls the CreatePatient stored procedure in the MySQL database, if there's an error, it's a duplicate account error and so it is redirected (should really check error message)
If the stored procedure returns no errors, then the account is created.
 */
exports.signup = function (req, res) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    var firstname = post.firstname;
    var lastname = post.lastname;
    var rpassword = post.confirm_password;

    var SQL = 'CALL CreatePatient(?,?,?,?,?,?)';


    bcrypt.genSalt(13, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            db.query(SQL, [username, hash, email, firstname, lastname, 1], function (err, results) {
                if (err !== null) {
                    message = "Sorry, that username is taken please try another one."

                    res.render('Login.ejs', {message: message});
                } else {
                    message = "Succesful! Your account has been created.";
                    res.render('Login.ejs', {message: message});

                }
            });

        });
    });


}

/*
Destroys session on logout and redirects to login page.
 */
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    })
};