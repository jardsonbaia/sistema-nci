const express = require("express")
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
    res.render("login/index")
})

router.post('/', (req, res, next) => {
    
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)

})

module.exports = router