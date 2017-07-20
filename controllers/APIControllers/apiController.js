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
    if(req.session.userId !== undefined){
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

    if (req.session.userId !== undefined){

        var SQL = 'Call RetrievePatientData(?)';
        console.log(req.session.userId);
        db.query(SQL,[req.session.userId],function(err,result){
            if (err){
                console.log(err);
                res.send(err);
            }else {
                console.log(result[0]);
                res.send(result[0]);
            }

        });

    }else {
        message = 'Login to retrieve data'
        res.render('Login.ejs',{message:message});
    }

};