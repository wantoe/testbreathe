     /*
     * GET home page.
     */

    exports.index = function(req, res){
        var message = ' ';3
        res.header('Login')
        res.render('Login.ejs',{message: message})
      };