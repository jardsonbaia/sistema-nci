module.exports = {
   
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.admin == 1){
            return next()
        }

        req.flash('error_msg', 'Você deve ser um administrador para acessar essa página!')
        res.redirect('/')

    }

}