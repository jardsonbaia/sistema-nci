const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render("cursos/index")
})



module.exports = router