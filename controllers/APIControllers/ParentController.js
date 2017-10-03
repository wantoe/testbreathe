exports.GetChildData = function getChildData(req,res){
    var parentId = req.session.userId;
    var SQL = 'Select child_id from parents where parents.parent_id=' + parentId;

    if(req.session.roleId === 2){

        db.query(SQL, function results(err,results) {
            if(err){
                res.sendStatus(500);
            }else {
                req.session.childId = results[0].child_id;
                res.sendStatus(204);
            }
            })



    }




};