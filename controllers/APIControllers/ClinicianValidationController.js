
exports.ValidateClinicians = function validateClinicians(req,res){
  post = req.body;
  cliniciansToValidate = req.body.acceptedClinicians;
  cliniciansToDecline = req.body.deniedClinicians;


  SQLVerify = 'CALL ValidateClinicians(?)';
  SQLDecline = 'CALL DeletePendingClinicians(?)';


if (cliniciansToValidate !== undefined)
db.query(SQLVerify,[cliniciansToDecline]);


if (cliniciansToDecline !== undefined)
db.query(SQLDecline, [cliniciansToDecline]);


    res.status(200);
    res.render('AdminDash', {message: 'Success'});










};