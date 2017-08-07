exports.getUserInfo = function (req,res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var search = req.query.search;
    var SQL = '';
    var count = '';
    var total = '';
    // Enter security here
    if(search !== undefined){
        SQL = 'CALL SearchUser(?,?,?)';
        SQLCount= 'CALL GetUserCount(?)';
        db.query(SQL,[search,limit,offset], function (err,result) {
           db.query(SQLCount,[search], function(error,result2){

                total =  result2[0][0]['count(user_id)'];
               total = JSON.stringify({total : total , rows : result[0]},null,4);
               console.log(total);
               res.send(total);

           });
        });
    }else {

    }



 };


exports.getPendingClincians = function (req,res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var search = req.query.search;
    var SQL = '';
    var count = '';
    var total = '';

    //Security needed

    SQL = 'CALL GetPendingClinicians(?,?)';
    SQLCount= 'CALL CountTemporaryClinicians()';
    db.query(SQL,[limit,offset], function (err,result2) {
        db.query(SQLCount, function(error,result){

            total =  result[0][0]['count(user_id)'];
            total = JSON.stringify({total : total , rows : result2[0]},null,4);
            console.log(total);
            res.send(total);

        });
    });




};
