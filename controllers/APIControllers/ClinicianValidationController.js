
exports.ValidateClinicians = function validateClinicians(req,res){
  post = req.body;

cliniciansToValidate = post.users;

 var SQLVerify = 'CALL ValidateClinicians(?)';

 var usernameString = '';
 var len = cliniciansToValidate.length;
console.log(post.users);

if (cliniciansToValidate !== undefined)
db.query(SQLVerify,[cliniciansToValidate], function (err, results){
    var   message ='Success!';

    if(err){
        console.log(err);
        message = 'Error try again';
    }

    res.render('AdminDash.ejs', {message:message});

});



};


exports.DeclineClinicians = function DeclineClinicians(req,res){
   var SQLDecline = 'CALL DeletePendingClinicians(?)';

   post = req.body;
   clinicians = post.users;

   db.query(SQLDecline, [clinicians], function(err,results){

      var  message ='Success!';

        if(err){
            console.log(err);
             message = 'Error try again';
        }

        res.render('AdminDash.ejs', {message:message});

    });
};