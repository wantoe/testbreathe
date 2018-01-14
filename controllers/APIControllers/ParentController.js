var dbQuery = require("../../Services/DatabaseService");
var callbacks = require("./Callbacks");
/**
 *
 * @param req
 * @param res
 * Gets data about children so that child and parent accounts can be linked.
 */
exports.GetChildData = function getChildData(req,res){
    var parentId = req.session.userId;
    var SQL = 'Select child_id, first_name, last_name from parents where parents.parent_id=' + parentId;

    if(req.session.roleId === 2){
      dbQuery.dbService(SQL,callbacks.ChildDataCallback, req,res );
    }


};
