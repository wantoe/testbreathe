/**
 * Created by Sid on 19/07/2017.
 */
const dbService = require('../../Services/DatabaseService');
const callbacks = require('./Callbacks');
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
             dbService.dbServiceWithParams(SQL,[idToPost,time,duration,successful_breaths,unsuccessful_time,unsuccessful_pressure,average_exhl_pressure,average_exhl_time,huff_coughs,source],callbacks.sentDataCallback,req,res);


    }
    
};
/**
 *
 * @param req
 * @param res
 * Processes patient data and retrieves it for patients to see.
 */
exports.getData = function (req,res) {
    this. SQL = 'Call RetrievePatientData(?)';

    var userId;
    var roleId;

    if(req.session.userId === undefined){
        userId = req.user.userId;
        roleId = req.user.roleId;
    }else {
        userId = req.session.userId;
        roleId = req.session.roleId;
    }
    this. idToPost = req.query.userId;


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


       dbService.dbServiceWithParams(SQL, [idToPost], callbacks.getDataCallback, req, res);


   }else {
        res.status(401);
       message = 'Login to retrieve data';
       res.render('Login.ejs',{message:message});
   }
};

/**
 *
 * @param req
 * @param res
 *
 * A method to see if the patient has satisfied their CPT hours.
 */

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
       dbService.dbServiceWithParams(SQL, [userId],callbacks.SatisfiedHoursCallback,req,res );
   }else {
       res.sendStatus(403);
   }



};

/**
 * @param req
 * @param res
 * Finds the clients current user requirements.
 */

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



    dbService.dbServiceWithParams(SQL,[userId],callbacks.getUserRequirementsCallback,req,res);



};