/**
 * Created by Sid on 19/07/2017.
 */



exports.sentData = function (req,res) {
    this. post = req.body;
    this. idToQuery = req.session.userId;
    this. time = post.time;
    this. duration = post.duration;
    this. successful_breaths = post.successful_breaths;
    this. unsuccessful_time = post.unsuccessful_time;
    this. unsuccessful_pressure = post.unsuccessful_pressure;
    this. average_exhl_pressure = post.average_exhl_pressure;
    this. average_exhl_time = post.average_exhl_time;
    this. huff_coughs = post.successful_huff_coughs;


    console.log(idToQuery);

    this. SQL = 'Call InsertPatientData(?,?,?,?,?,?,?,?,?)';
    if(req.session.userId !== undefined){



    } else {

    }

    switch (req.session.userId){
        case undefined:
            message = 'Login to send data';
            res.render('Login.ejs',{message:message});
            break;
         default :
             db.query(SQL,[idToQuery,time,duration,successful_breaths,unsuccessful_time,unsuccessful_pressure,average_exhl_pressure,average_exhl_time,huff_coughs], function insertData(err, results) {
                 console.log(err);
                 console.log(results);
                 message='Success!';
                 res.render('datapage.ejs',{message:message});
             });

    }
    
};

exports.getData = function (req,res) {
    this. idToQuery = req.query.userId;
    this. SQL = 'Call RetrievePatientData(?)';
    console.log(idToQuery);


   if(req.session.userId !== undefined) {
       switch (req.session.roleId) {
           case 1:
               idToQuery = req.session.userId;
               db.query(SQL, [idToQuery], function (err, result) {
                   if (!err) {
                       console.log(result[0]);
                       res.send(result[0]);
                   } else {
                       console.log(err);
                       res.send(err);
                   }

               });
               break;
           case 2:
               // implement later
               break;
           case 3:
           case 4:
               if (idtoQuery !== undefined) {
                   db.query(SQL, [idToQuery], function (err, result) {
                       if (!err) {
                           res.send(result[0]);
                       } else {
                           console.log(err);
                           res.send(err);
                       }
                   });
               }else {
                   res.send(404);
               }
               break;


       }
   }else {
       message = 'Login to retrieve data';
       res.render('Login.ejs',{message:message});
   }
};





