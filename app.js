const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const admin = require ('./routers/admin')
const path = require('path')
const port = 2222

//Inicialização Express
const app = express()

//Inicialização Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

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



//Inicialização do Servidor
app.listen(port, () => {
    console.log('Servidor rodando em ', port)
})
