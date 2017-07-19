/**
 * Created by Sid on 19/07/2017.
 */
exports.senddata = function (req,res){
    var message = '';
    if(req.session.userId !== null) {
        message = 'Submit cycle data';
        res.render('datapage.ejs', {message: message});
    }else {
        message = 'Please login to continue';
        res.render('Login.ejs', {message: message});
    }
};

exports.dashboard = function (req,res) {
    var message = '';
    if(req.session.userId !== null) {
        message = 'View your data';
        res.render('Dashboard.ejs', {message: message});
    }else {
        message = 'Please login to continue';
        res.render('Login.ejs', {message: message});
    }
};