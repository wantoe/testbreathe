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

   //THIS CALL DOES NOT WORK ON THE SERVER
   //cliniciansToValidate = Object.values(post)[0];

   console.log(post);

   cliniciansToValidate = Object.keys(post).map(e => post[e]);

   if(cliniciansToValidate == null) {
      res.sendStatus(406);
   }

   var SQLVerify = 'CALL ValidateClinicians(?,?)';

   var len = cliniciansToValidate.length;
   console.log(len);

        db.query(SQLVerify, [cliniciansToValidate, len], function (err, results) {
            var message = 'Success!';
            console.log('query complete');

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
   clinicians = Object.keys(post).map(e => post[e]);
   size = clinicians.length;

   dbService.dbServiceWithParams(SQLDecline, [clinicians, size], callbacks.declineCliniciansCallback, req , res);

};