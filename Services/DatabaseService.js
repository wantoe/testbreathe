/**
 *
 * @param statement The statement to execute
 * @param callback The callback to provide the data with
 * @param request The request made
 * @param res The response variable
 *
 * Provides a service in which you can communicate with the database, with no parameters.
 */
exports.dbService = function dbService(statement, callback, request, res){
    db.query(statement, function (err,results){
        callback(err,results,request, res);
    })
};


exports.dbServiceWithParams = function  dbService (statement, parameters ,  callback, request, res){
        db.query(statement, parameters, function(err,results){
            callback(err,results,request,res);
        });
}

