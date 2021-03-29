const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {formatDate} = require('../helpers/formatDate')

require("../models/UsuarioSchema")
const Usuario = mongoose.model("usuarios")


router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {
    let erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome Inválido!"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: "Email Inválido!"})
    }
    if(!req.body.data_nascimento || typeof req.body.data_nascimento == undefined || req.body.data_nascimento == null) {
        erros.push({texto: "Data de Nascimento Inválida!"})
    }
    if(!req.body.cargo || typeof req.body.cargo == undefined || req.body.cargo == null) {
        erros.push({texto: "Cargo Inválido!"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: "Senha Inválida!"})
    }
    if(req.body.senha.length < 6) {
        erros.push({texto: "Senha muito pequena!"})
    }
    if(req.body.senha != req.body.senha2) {
        erros.push({texto: "As senhas não correspodem!"})
    }
    if(req.body.codigo != "0080") {
        erros.push({texto: "Código de acesso incorreto!"})
    }

    if(erros.length > 0) {
        
        res.render('usuarios/registro', {erros: erros})

    }else {
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario) {
                req.flash('error_msg', "Usuário já existe!")
                res.redirect('/usuarios/registro')
            }else {

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    cargo: req.body.cargo,
                    data_nascimento: formatDate(req.body.data_nascimento),
                    admin: 1
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro) {
                            req.flash('error_msg', "Erro ao Salvar Usuário")
                            res.redirect('/')
                        }else {
                            novoUsuario.senha = hash
                           
                            novoUsuario.save().then(() => {
                                req.flash('success_msg', "Conta criada com sucesso!")
                                res.redirect('/')
                            }).catch((err) => {
                                req.flash('error_msg', "Erro ao criar a conta!")
                                res.redirect('/usuarios/registro')
                           })
                        }
                    })
                })

            }
        }).catch((err) => {
            req.flash("error_msg", "Erro interno!")
            res.redirect('/')
        })
    }
})


module.exports = router