/*
 * GET home page.
 */

exports.index = function (req, res) {
    var message = ' ';

    if(req.session.userId){
        message = 'Welcome ' + req.session.firstName;
        res.render('Dashboard.ejs',{message:message});
    }
    res.render('Login.ejs', {message: message})
};