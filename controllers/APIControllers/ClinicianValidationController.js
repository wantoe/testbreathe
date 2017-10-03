
exports.ValidateClinicians = function validateClinicians(req,res){
  post = req.body;

cliniciansToValidate = post.users;

 var SQLVerify = 'CALL ValidateClinicians(?,?)';

 var usernameString = '';
 var len = cliniciansToValidate.length;
console.log(post.users);

if (cliniciansToValidate !== undefined)
db.query(SQLVerify,[cliniciansToValidate, len], function (err, results){
    var   message ='Success!';

    if(err){
        console.log(err);
        message = 'Error try again';
    }
    console.log(results);
    res.render('AdminDash.ejs', {message:message});
});



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