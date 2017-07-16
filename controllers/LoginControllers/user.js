/**
 * Created by Sid on 16/07/2017.
 */

module.exports.signupPatient = function(req, res){
    message = ' ';


    if (req.method === 'post'){
        var post = req.body;
        console.log(post.firstname);

        message = "Succesfully! Your account has been created.";
        res.render('Login.ejs',{message: message});
            }

}

