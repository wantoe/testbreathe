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

exports.loginAs = function (req, res) {
    if (req.session.roleId === 4){
        var user_id = req.body.user_id;
        var sess = req.session;
        var SQL = 'CALL CheckAccount(?)'
        var fs = require('fs');

        db.query('select username, password from users where user_id=' + user_id, null, function (err, result) {
            var temp = result[0];

            username = temp.username;
            password = temp.password;

            console.log('In first query');

            db.query(SQL, [username], function (err, results) {
                // If the passwords match, start a session and send user to dashboard.
                if (results[0].length > 0 ) {
                    //CHANGE SO THAT IT USES SELECT DISTINCT
                    
                    console.log("In second query");

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

                            console.log(role_id);

                            if (role_id === 1) {
                                message = 'Welcome ' + ' To the BreatheHero Portal';
                                console.log("Rendering Client Dash...");
                                res.render('Dashboard.ejs', {message: message});
                            } else if (role_id === 2) {
                                message = 'Welcome ' + ' To the BreatheHero Portal';
                                console.log("Rendering Parent Dash...");
                                res.render('ParentDash.ejs', {message: message});
        
                            } else if (role_id === 3) {
                                // Clinician portal
                                console.log("Rendering Clinician Dash...")
                                res.render('ClinicianDash.ejs');
                            } else if (role_id === 4) {
                                // Do nothing here, can't log in as another admin.
                                console.log("Whoops, I shouldn't be here...");
                            }
        
                        }else {
                            message ='Invalid Credentials';
                            res.render('Login.ejs', {message: message});
                        }
                    });
                } else {
                    console.log('failure');
                }
            });

        });
    }
};