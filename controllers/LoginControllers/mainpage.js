/*
 * GET home page.
 */

exports.index = function (req, res) {
    var message = ' ';
    res.render('Login.ejs', {message: message})
};