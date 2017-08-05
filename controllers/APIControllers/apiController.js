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





