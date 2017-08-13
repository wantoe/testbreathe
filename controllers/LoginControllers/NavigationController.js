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
    if(req.session.userId !== undefined) {
        message = 'View your data';
        res.render('Dashboard.ejs', {message: message});
    }else {
        message = 'Please login to continue';
        res.render('Login.ejs', {message: message});
    }
};

exports.clinicianSignup = function(req,res){
    var message = '';
  res.render('SignUpPhysician.ejs',{message:message});
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