     /*
     * GET home page.
     */

    exports.index = function(req, res){
        var message = ' ';
        console.log('hi');
        res.render('Login.ejs',{message: message})
      };