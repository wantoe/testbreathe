const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function (passport) {

        passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true



    }, function (req, username, password, done) {
        var SQL = 'Call CheckAccount(?)';
        console.log(password);
        db.query(SQL, [username], function findAccount(err, results) {
            if (results[0].length > 0 ) {
                //CHANGE SO THAT IT USES SELECT DISTINCT

                bcrypt.compare(password, results[0][0].password, function(req,isValid){
                    console.log(results[0][0].password === password);

                    if(isValid || results[0][0].password === password){
                        var res = results[0][0];
                        var model = {
                            userId: res.user_id,
                            roleId: res.role_id

                        };
                        console.log("WAT");

                        return done(null, model);

                    }else {

                    return done(null,false, {message: 'Invalid Credentials'});}
                    }

                );

            }
            //If passwords don't match send error message and redirect to login page.
            else {
                message = 'Wrong Username or Password';
                this.res.render('Login.ejs', {message: message});
            }


    });

    passport.serializeUser(function(user, done) {
        done(null, {
            id: user.userId,
            roleId: user.roleId

        });
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

}));

passport.use('basic',new BasicStrategy(
    function (username,password,done){
        console.log('hi');
        var SQL = 'Call CheckAccount(?)';
        console.log(password);
        console.log('yo');
        db.query(SQL, [username], function findAccount(err, results) {
            if (results[0].length > 0 ) {
                //CHANGE SO THAT IT USES SELECT DISTINCT

                bcrypt.compare(password, results[0][0].password, function(req,isValid){
                        console.log(results[0][0].password === password);

                        if(isValid || results[0][0].password === password){
                            var res = results[0][0];
                            var model = {
                                userId: res.user_id,
                                roleId: res.role_id

                            };

                            return done(null, model);

                        }else {

                            return done(null,false);
                    }}

                );

            }
            //If passwords don't match send error message and redirect to login page.
            else {
                return done(null,false);
            }


        });
        passport.serializeUser(function(user, done) {
            done(null, {
                id: user.userId,
                roleId: user.roleId

            });
        });

        passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });



    }
    ));

};

