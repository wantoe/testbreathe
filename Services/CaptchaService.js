var request = require('request');

exports.checkCaptcha = function checkCaptcha (req,res) {
    var secret = '6Lff4DMUAAAAAEURnXObqKGHysA-51VAUDRRHDz5';
        if(req.body['g-captcha-response'] === undefined){
            res.render('Login.ejs', {message:'Please enter the captcha'});
        }else {
            var options = {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                url: 'https://www.google.com/recaptcha/api/siteverify',
                body: {
                    secret: secret,
                    response: body['g-captcha-response']
                }
            };

                request.post(options, function response(err,res){
                 if(err){
                     res.render('Login.ejs',{message:'Please enter the captcha'});
                 }else {
                     next();
                 }

                }
                );
            }


        };
