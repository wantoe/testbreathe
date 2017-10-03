/**
 * Created by Sid on 19/07/2017.
 */
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

exports.userSettingsDashboard = function (req,res){
    var message = '';
    if (req.session.roleId === 3){
        res.render('userSettingsDashboard.ejs', {message:message});
    }else {
        res.sendStatus(403);
    }
};