/**
 * Created by Sid on 19/07/2017.
 */



exports.sentData = function (req,res) {
    this. post = req.body;
    this. time = post.time;
    this. duration = post.duration;
    this. successful_breaths = post.successful_breaths;
    this. unsuccessful_time = post.unsuccessful_time;
    this. unsuccessful_pressure = post.unsuccessful_pressure;
    this. average_exhl_pressure = post.average_exhl_pressure;
    this. average_exhl_time = post.average_exhl_time;
    this. huff_coughs = post.successful_huff_coughs;
    var source;


    if(req.session.passport.user.id === undefined){
        this.idToPost = req.user.userId;
        source = 'GAME';
    }else {
        this. idToPost = req.session.passport.user.id;
        source = 'MANUAL'

    }

    console.log(req.user.userId);

    this. SQL = 'Call InsertPatientData(?,?,?,?,?,?,?,?,?,?)';

    switch (idToPost){
        case undefined:
            if(req.session.passport.user.id  !== undefined ) {
                res.status(403);
                message = 'Login to send data';
                res.render('Login.ejs', {message: message});
            } else {
                res.sendStatus(401);
            }
            break;
         default :
             db.query(SQL,[idToPost,time,duration,successful_breaths,unsuccessful_time,unsuccessful_pressure,average_exhl_pressure,average_exhl_time,huff_coughs,source], function insertData(err, results) {
                 console.log(err);
                 console.log(results);
                 res.status(200);
                 message='Success!';
                 res.render('datapage.ejs',{message:message});
             });

    }
    
};

exports.getData = function (req,res) {
    this. SQL = 'Call RetrievePatientData(?)';

    var userId;
    var roleId;

    if(req.session === undefined){
        userId = req.user.userId;
        roleId = req.user.roleId;
    }else {
        userId = req.session.passport.user.id;
        roleId = req.session.passport.user.roleId;
    }
    this. idToPost = req.query.userId;

    console.log(idToPost);

    if(userId !== undefined) {
       switch (roleId) {
           case 1:
               idToPost = userId;

               break;
           case 2:
               //implement later
               break;
           case 3:
           case 4:
               if (idToPost === undefined){
                   res.sendStatus(404);
               }
               break;


       }

        db.query(SQL, [idToPost], function (err, result) {
            if (!err) {
                console.log(result[0]);
                res.send(result[0]);
            } else {
                console.log(err);
                res.send(err);
            }

        });
   }else {
        res.status(401);
       message = 'Login to retrieve data';
       res.render('Login.ejs',{message:message});
   }
};


exports.satisfiedHours = function (req,res){
    var userId;
    var SQL;
    console.log('hello');
    if(req.session.passport.user.roleId ===  1) {
         userId = req.session.passport.user.id;
    }else {
         userId = req.query.userId;

    }

   if (req.session.passport.user.roleId !== undefined){
        SQL = 'CALL GetWeeklyPatientData(?)';

       db.query(SQL,[userId], function checkReqs(err,results){

            if(err){
                console.log(err);
                res.sendStatus(500);
            }else {
                res.send(results[0]);
            }

       });


   }else {
       res.sendStatus(403);
   }



};


exports.getUserRequirements = function findUserHours(req,res){
    var userId;
    var SQL;

    console.log('hi');

    if(req.session.passport.user.roleId ===  1) {
        userId = req.session.passport.user.id;
    }else {
        userId = req.query.userId;

    }

    SQL = 'CALL GetUserRequirements(?)';


    db.query(SQL,[userId], function checkReqs(err,results){

        if(err){
            res.sendstatus(500);
        }else {
            res.send(results[0]);
        }
    });

};