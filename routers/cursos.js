const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.render("cursos/index")
})

router.get('/basico/', (req, res) => {
    res.render("cursos/basico")
})

router.get('/avancado1/', (req, res) => {
    res.render("cursos/avancado1")
})

router.get('/avancado2/', (req, res) => {
    res.render("cursos/avancado2")
})

router.get('/avancado3/', (req, res) => {
    res.render("cursos/avancado3")
})

router.get('/avancadokids/', (req, res) => {
    res.render("cursos/avancadokids")
})


module.exports = router