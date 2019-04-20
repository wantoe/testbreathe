var dbService = require('../../Services/DatabaseService');
var callbacks = require('./Callbacks');
/**
 *
 * @param req
 * @param res
 * @constructor
 * Allows for clinicians to be validated.
 */
exports.ValidateClinicians = function validateClinicians(req,res){
    // Change this from the frontend
   post = req.body;

   cliniciansToValidate = Object.values(post)[0];

   if(cliniciansToValidate == null) {
      res.sendStatus(406);
   }

   var SQLVerify = 'CALL ValidateClinicians(?,?)';

   var len = cliniciansToValidate.length;
        db.query(SQLVerify, [cliniciansToValidate, 1], function (err, results) {
            var message = 'Success!';

            if (err) {
               res.sendStatus(409);
            }
            res.sendStatus(200);
        });
};


/**
 *
 * @param req
 * @param res
 * @constructor
 * Allows for clinicians to be declined.
 */
exports.DeclineClinicians = function DeclineClinicians(req,res){
   var SQLDecline = 'CALL DeclineClinicians(?,?)';

   post = req.body;
   clinicians = Object.values(post)[0];
   size = clinicians.length;

   dbService.dbServiceWithParams(SQLDecline, [clinicians, size], callbacks.declineCliniciansCallback, req , res);

};