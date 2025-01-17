/**
 * Created by Sid on 19/07/2017.
 */
var dbService = require('../../Services/DatabaseService');
var bcrypt = require('bcrypt');
var path = require('path');

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

exports.accountManagement = function(req, res) {
    if(req.session.roleId === 4) {
        res.render('AdminAccManager.ejs', {message:''});
    } else {
        var message = 'Unauthorized';
        res.render('Login.ejs', {message:message});
    }
}

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

exports.changePassword = function (req, res) {
    var message ='';
    if (req.session.roleId !== undefined) {
        res.render('PasswordChangeForm.ejs', {message: message});
    } else {
        res.sendStatus(403);
    }
}

exports.loginAs = function (req, res) {
    if (req.session.roleId === 4){
        var user_id = req.body.user_id;
        getUsernameandPassword(user_id, login, req, res);
    } else {
        res.sendStatus(403);
    }
};

function getUsernameandPassword(user_id, callback, req, res) {
    db.query('select username, password from users where user_id=' + user_id, null, function (err, result) {
        var temp = result[0];

        username = temp.username;
        password = temp.password;

        results = {username: username, 
                   password: password};

        if(err) {
           return callback(err, null, req, res);
        } else {
           return callback(null, results, req, res);
        }
    });
};

function login(err, result, req, res) {
    var sess = req.session;
    var username = result.username;
    var password = result.password;
    var message = '';
    var fs = require('fs');

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

                    var role_id = sess.roleId;

                    render(role_id, res);
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

function render(role_id, res) {
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
    } else {
        res.render('Login.ejs');
    }

    res.end();

    console.log('Rendered');
};