/**
 * Created by Sid on 19/07/2017.
 */

exports.sentData = function (req,res) {
    var post = req.body;
    var userID = req.session.userId;
    var time = req.time;
    var duration = req.duration;
    var cycles = req.cycles;

    if(req.session.userId !== null){
        var SQL = 'Call InsertPatientData(?,?,?,?)'
        var message = '';

        db.connection.query(SQL,[userID,time,duration,cycles], function (err,result) {
            message = 'You have successfully submitted';
        res.render('datapage.ejs' ,{message:message});


        });
    } else {
        message = 'Login to send data'
        res.render('Login.ejs',{message:message});
    }
    
};

exports.getData = function (req,res) {

    if (req.session.userId !== null){

        var SQL = 'Call RetrievePatientData(?,)'

        db.connection.query(SQL,[req.session.userId],function(err,result){

        });

    }else {
        message = 'Login to retrieve data'
        res.render('Login.ejs',{message:message});
    }

};