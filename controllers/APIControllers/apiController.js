/**
 * Created by Sid on 19/07/2017.
 */


/**
 * Method processes the data that was sent to the API from the user, either from the game or the stanndalone source.
 * Processes the data to be logged inside of the database and determines the source of it.
 * @param req the request sent
 * @param res the response provided
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

    console.log(req.body);

    if(req.session.userId === undefined){
        this.idToPost = req.user.userId;
        source = 'GAME';
    }else {
        this. idToPost = req.session.userId;
        source = 'MANUAL'

    }



    this. SQL = 'Call InsertPatientData(?,?,?,?,?,?,?,?,?,?)';

    switch (idToPost){
        case undefined:
            if(req.session.userId  !== undefined ) {
                res.status(403);
                message = 'Login to send data';
                res.render('Login.ejs', {message: message});
            } else {
                res.sendStatus(401);
            }
            break;
         default :
             db.query(SQL,[idToPost,time,duration,successful_breaths,unsuccessful_time,unsuccessful_pressure,average_exhl_pressure,average_exhl_time,huff_coughs,source], function insertData(err, results) {
                 if(err){
                     res.send(err,400);
                 }else {
                 console.log(results);
                 res.status(200);
                 message='Success!';
                 res.render('datapage.ejs',{message:message});
                     }
             });

    }
    
};

exports.getData = function (req,res) {
    this. SQL = 'Call RetrievePatientData(?)';

    var userId;
    var roleId;
    console.log(req);

    if(req.session.userId === undefined){
        userId = req.user.userId;
        roleId = req.user.roleId;
    }else {
        userId = req.session.userId;
        roleId = req.session.roleId;
    }
    this. idToPost = req.query.userId;

    console.log(req.session);

    if(userId !== undefined) {
       switch (roleId) {
           case 1:
               idToPost = userId;

               break;
           case 2:
               idToPost = req.session.childId;
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
    var roleId = req.session.roleId;
    console.log('hello');
    if(roleId ===  1) {
         userId = req.session.userId;
    }else if (roleId === 2){

        userId = req.session.childId;
    }else {
         userId = req.query.userId;

    }

   if (req.session.roleId !== undefined){
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
    var roleId = req.session.roleId;
    console.log('hi');

    if( roleId ===  1) {
        userId = req.session.userId;
    }else if (roleId === 2){
        userId = req.session.childId;

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