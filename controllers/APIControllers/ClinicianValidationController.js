
exports.ValidateClinicians = function validateClinicians(req,res){
  post = req.body;

cliniciansToValidate = post.users;

 var SQLVerify = 'CALL ValidateClinicians(?,?)';

 var len = cliniciansToValidate.length;

if (cliniciansToValidate !== undefined) {
    var usernames = cliniciansToValidate.split(',');
    for(var i in usernames) {
        console.log(usernames[i]);
        db.query(SQLVerify, [usernames[i], 1], function (err, results) {
            var message = 'Success!';

            if (err) {
                console.log(err);
                message = 'Error try again';
            }
            console.log(results);
        });
    }
    res.sendStatus(200);
}

};


exports.DeclineClinicians = function DeclineClinicians(req,res){
   var SQLDecline = 'CALL DeclineClinicians(?,?)';

   post = req.body;
   clinicians = post.users;
   size = clinicians.length;
   db.query(SQLDecline, [clinicians, size], function(err,results){

      var  message ='Success!';

        if(err){
            console.log(err);
             message = 'Error try again';
        }

        res.render('AdminDash.ejs', {message:message});
       console.log('RENDER');


   });
};