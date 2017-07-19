/**
 * Created by Sid on 19/07/2017.
 */



exports.sentData = function (req,res) {
    var post = req.body;
    var userID = req.session.userId;
    var time = post.time;
    var duration = post.duration;
    var cycles = post.cycles;
    var SQL = 'Call InsertPatientData(?,?,?,?)';
    console.log(post);

    if(userID !== null){
     db.query(SQL,[userID,time,duration,cycles], function (err,results) {
         message='Success!';
         res.render('datapage.ejs',{message:message});
     });


    } else {
        message = 'Login to send data';
        res.render('Login.ejs',{message:message});
    }
    
};

exports.getData = function (req,res) {

    if (req.session.userId !== null){

        var SQL = 'Call RetrievePatientData(?)';

        db.connection.query(SQL,[req.session.userId],function(err,result){

        });

    }else {
        message = 'Login to retrieve data'
        res.render('Login.ejs',{message:message});
    }

};