/**
 * Created by Sid on 19/07/2017.
 */
var dbService = require('../../Services/DatabaseService');
var bcrypt = require('bcrypt');

exports.senddata = function (req,res){
    var message = '';
    if(req.session.userId !== undefined) {
        message = 'Submit cycle data';
        res.render('datapage.ejs', {message: message});
    }else {
        message = 'Please login to continue';
        res.render('Login.ejs', {message: message});
    }
};

exports.dashboard = function (req,res) {
    var message = '';
    console.log(req.session);
    if(req.session.userId !== undefined) {
        message = 'View your data';
        res.render('Dashboard.ejs', {message: message});
    }else {
        message = 'Please login to continue';
        res.render('Login.ejs', {message: message});
    }
};

exports.parentdashboard = function (req,res){

    if(req.session.roleId === 2){
        res.render('ParentDash.ejs', {message:  ' Welcome to the parent Dashboard'});
    }else {
        message = 'Please Login to Continue';
        req.logout();
        res.render('Login.ejs', {message:message});
    }
};

exports.clinicianSignup = function(req,res){
    var message = '';
  res.render('SignUpPhysician.ejs',{message:message});
};


exports.clinicianDash = function(req,res){
    var message = '';
    if (req.session.roleId === 3){
        res.render('ClinicianDash.ejs', {message:message});
    }else {
        res.sendStatus(403);
    }
};

exports.signUpPatient = function(req,res){
    var message = '';
    if (req.session.roleId === 3){
        res.render('SignUpPatient.ejs', {message:message});
    }else {
        res.sendStatus(403);
    }
};

exports.signUpAdmin = function(req,res){

    if(req.session.roleId === 4){
        res.render('AdminSignup.ejs', {message: ''});
    }else {
        res.render('Login.ejs',{message:'Sorry admin privileges only.'});
    }
};

exports.adminDash = function (req,res) {
    if(req.session.roleId === 4){
        res.render('AdminDash.ejs', {message:''});
    }else {
        var message ='Sorry, log in and try again';
        res.render('Login.ejs', {message:message});
    }

};

exports.parentSignUp = function(req,res){
    var message = '';
    if(req.session.roleId === 1) {

        res.render('ParentSignUp.ejs',{message:message});
    }

};

exports.patientSettingsDashboard = function (req, res){
    var message = '';
    if (req.session.roleId === 3){
        res.render('PatientSettingsDashboard.ejs', {message:message});
    }else {
        res.sendStatus(403);
    }
};

exports.getUsernameandPassword = function (req, res, next) {
    if (req.session.roleId === 4){
        var user_id = req.body.user_id;

        db.query('select username, password from users where user_id=' + user_id, null, function (err, result) {
            var temp = result[0];  
            console.log('In first query');

            username = temp.username;
            password = temp.password;

            out = JSON.stringify({
                username: username,
                password: password
            });

            res.send(out);

            return next();
        });
    }
};

exports.adminLogin =  function (req, res) {
    var post = res.body;
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