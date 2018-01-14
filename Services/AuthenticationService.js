const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;


/**
 *
 * @param passport
 * Used for BASIC Authentication
 */
module.exports = function (passport) {

passport.use('basic',new BasicStrategy(
    function (username,password,done){
        var SQL = 'Call CheckAccount(?)';

        db.query(SQL, [username], function findAccount(err, results) {
            if (results[0].length > 0 ) {
                //CHANGE SO THAT IT USES SELECT DISTINCT

                bcrypt.compare(password, results[0][0].password, function(req,isValid){
                    console.log('hi');
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

