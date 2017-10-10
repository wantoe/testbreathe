var request = require('request');

exports.checkCaptcha = function checkCaptcha (req,res,next) {
    var secret = '6Lff4DMUAAAAAEURnXObqKGHysA-51VAUDRRHDz5';
    console.log(req.body['g-recaptcha-response']);
        if(req.body['g-recaptcha-response'] === undefined){
            res.render('Login.ejs', {message:'Please enter the captcha'});
        }else {
            var formdata ={
                secret: secret,
                response :  req.body['g-recaptcha-response']
            };
            var options = {
                url: 'https://www.google.com/recaptcha/api/siteverify',
                body: formdata,
                headers: {
                    'Content-Type': 'Application/json'
                },
                json:true
            };

                request.post(options, function response(err,resp,body){
                 if(err){
                     console.log(body);
                     res.render('Login.ejs',{message:'Please enter the captcha'});
                 }else {
                     next();
                 }

                }
                );
            }


        };
