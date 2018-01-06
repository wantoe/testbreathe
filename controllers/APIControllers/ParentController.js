exports.GetChildData = function getChildData(req,res){
    var parentId = req.session.userId;
    var SQL = 'Select child_id, first_name, last_name from parents where parents.parent_id=' + parentId;

    if(req.session.roleId === 2){

        db.query(SQL, function results(err,results) {
            if(err){
                res.sendStatus(500);
            }else {
                req.session.childId = results[0].child_id;
                res.send(results[0].first_name + " " + results[0].last_name);
            }
            })



    }




};