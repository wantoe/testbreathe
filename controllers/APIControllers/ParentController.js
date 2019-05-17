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
    var SQL = 'Select parents.child_id,users.first_name,users.last_name from users join parents on users.user_id=parents.child_id where parents.parent_id=' + parentId;

    if(req.session.roleId === 2){
      dbQuery.dbService(SQL,callbacks.ChildDataCallback, req,res );
    }


};
