const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const admin = require ('./routers/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const port = 2222

//Inicialização Express
const app = express()

// Conf Sessão
app.use(session({
    secret: "keynci",
    resave: true,
    saveUninitialized: true
}))

// Conf Flash
 app.use(flash())

//Midleaware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})


//Inicialização Handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({defaultLayout: 'main'}))


//Conf bodyparser
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nci', {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
    console.log('Banco Conectado')
}
).catch( (err) => {
    console.log('Erro ao conectar: ', err)
})

// Public
app.use(express.static(path.join(__dirname,"public")))


//Rotas Express
app.get('/', (req, res) => {
   res.render('home/index') 
})
app.use('/admin', admin)


const data = new Date()
const dataCompleta = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear()

//Inicialização do Servidor
app.listen(port, () => {
    console.log('Servidor rodando em ', port)
    console.log(dataCompleta)
})
