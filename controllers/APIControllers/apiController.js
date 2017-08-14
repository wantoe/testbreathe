/**
 * Created by Sid on 19/07/2017.
 */



exports.sentData = function (req,res) {
    var post = req.body;
    var userID = req.session.userId;
    var time = post.time;
    var duration = post.duration;
    var successful_breaths = post.successful_breaths;
    var unsuccessful_time = post.unsuccessful_time;
    var unsuccessful_pressure = post.unsuccessful_pressure;
    var average_exhl_pressure = post.average_exhl_pressure;
    var average_exhl_time = post.average_exhl_time;
    var huff_coughs = post.successful_huff_coughs;


    console.log(userID);

    var SQL = 'Call InsertPatientData(?,?,?,?,?,?,?,?,?)';
    if(req.session.userId !== undefined){
     db.query(SQL,[userID,time,duration,successful_breaths,unsuccessful_time,unsuccessful_pressure,average_exhl_pressure,average_exhl_time,huff_coughs], function (err,results) {
         console.log(err);
         console.log(results);
         message='Success!';
         res.render('datapage.ejs',{message:message});
     });


    } else {
        message = 'Login to send data';
        res.render('Login.ejs',{message:message});
    }
    
};

exports.getData = function (req,res) {
    var userID = req.query.userId;
    var SQL = 'Call RetrievePatientData(?)';
    console.log(userID);
  if (req.session.userId !== undefined && userID === undefined && req.session.roleId < 3){
        if(req.session.roleId === 1) {
            userID = req.session.userId;
        }else if (req.session.roleId === 2){
            //Enter parent details here.
        }
      db.query(SQL,[userID],function(err,result){
          if (!err) {
              console.log(result[0]);
              res.send(result[0]);
          } else {
              console.log(err);
              res.send( err);
          }

          });
    }else if(userID !== undefined && req.session.roleId > 2 && req.session.userId !== undefined) {

          db.query(SQL,[userID],function(err,result){
              if (!err) {
                  res.send(result[0]);
              } else {
                  console.log(err);
                 res.send(err);
              }
  });
  } else {
        message = 'Login to retrieve data';
        res.render('Login.ejs',{message:message});
    }
  };





