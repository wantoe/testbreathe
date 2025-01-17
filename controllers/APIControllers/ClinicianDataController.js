var dbService = require('../../Services/DatabaseService');
var callBacks = require('./Callbacks');
/**
 *
 * @param req
 * @param res
 * Gets information about the selected users for clinicians.
 */
exports.getUserInfo = function (req,res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var SQL = '';
    var count = '';
    var total = '';
    // Enter security here
    if(req.session.roleId >2) {
        SQL = 'CALL SearchUser(?,?)';
        SQLCount = 'CALL GetUserCount()';

        db.query(SQL, [limit, offset], function (err, result) {

            db.query(SQLCount, function (error, result2) {

                console.log(result);
                console.log(result2);

                total = result2[0][0]['count(users.user_id)'];
                total = JSON.stringify({total: total, rows: result[0]}, null, 4);
                res.send(total);
            });
        });
    }else {
        res.send(401);
    }
 };

/**
 *
 * @param req
 * @param res
 * Gets the temporarily registered clinicians.
 */

exports.getPendingClincians = function (req,res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var search = req.query.search;
    var SQL = '';
    var count = '';
    var total = '';

    //Security needed

    if(req.session.roleId === 4) {
        SQL = 'CALL GetPendingClinicians(?,?)';
        SQLCount = 'CALL CountTemporaryClinicians()';
        db.query(SQL, [limit, offset], function (err, result2) {
            db.query(SQLCount, function (error, result) {

                total = result[0][0]['count(username)'];
                total = JSON.stringify({total: total, rows: result2[0]}, null, 4);
                console.log(total);
                res.send(total);

            });
        });

    }else {
        res.send(401);
    }
};

/**
 * 
 * @param req
 * @param res
 * Gets a list of all registered accounts.
 */

 exports.getAllAccounts = function(req,res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var search = req.query.search;
    var SQL = '';
    var count = '';
    var total = '';

    if(req.session.roleId === 4) {
        if(req.session.userId !== undefined){
            var userId = req.session.userId;
        }else {
            var userId = req.user.userId;
        }
    
        var SQL = 'select user_id, username, email, first_name, last_name from users';
    
        db.query(SQL, function(err,dbres){
            out = JSON.stringify({total: dbres.length, rows: dbres}, null, 4);
            res.send(out);
        });
    

    }else {
        res.send(401);
    }
 }

/**
 *
 * @param req
 * @param res
 * Updates the user data for current patients.
 */
exports.UpdateUserData = function(req,res){
    var post = req.body;
    var pressure = post.new_pressure;
    var time = post.new_time;
    var userId = post.userId;
    var SQL;

    console.log(post.new_pressure);
    console.log('reaching');


    SQL = 'Call UpdatePatientLimits(?,?,?)';

    if(req.session.roleId === 3){

        dbService.dbServiceWithParams(SQL,[userId,time,pressure], callBacks.updateUserDataCallback, req, res );


    }else {
        res.sendStatus(403);
    }
};