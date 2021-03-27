const express = require("express")
const router = express.Router()
const passport = require('passport')

router.get("/", (req, res) => {
    req.logout()
    req.flash('success_msg', 'Usuário deslogado!')
    res.redirect('/')
})


module.exports = router