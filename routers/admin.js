const { request } = require("express")
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/AlunoSchema')
const Aluno = mongoose.model('aluno')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/cadastro_alunos', (req, res) => {
    res.render('admin/cadastro_alunos')
})

router.get('/painel_alunos', (req, res) => {
    Aluno.find().lean().then((alunos) => {
        res.render('admin/painel_alunos', {alunos: alunos})
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar os alunos!')
        res.redirect('/admin')
    })
})

// Rota que recebe os dados do cadastro e salva no banco
router.post('/cadastro_alunos/novo', (req, res) => {

    // Validação de dados que são enviado pra rota
    let erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 10) {
        erros.push({ texto: "Nome inválido" })
    }
    if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null || req.body.telefone.length < 11) {
        erros.push({ texto: "Telefone inválido" })
    }
    if (!req.body.curso || typeof req.body.curso == undefined || req.body.curso == null) {
        erros.push({ texto: "Curso inválido" })
    }
    if (!req.body.curso || typeof req.body.data_nascimento == undefined || req.body.data_nascimento == null || req.body.data_nascimento.length !== 10) {
        erros.push({ texto: "Data de nascimento inválida" })
    }
    if (!req.body.horario_curso || typeof req.body.horario_curso == undefined || req.body.horario_curso == null) {
        erros.push({ texto: "Horário do curso inválido" })
    }
    if (!req.body.dia_curso || typeof req.body.dia_curso == undefined || req.body.dia_curso == null) {
        erros.push({ texto: "Dia do curso inválido" })
    }
    // Verificado se ocorreu erros
    if (erros.length > 0) {
        res.render("admin/cadastro_alunos", { erros: erros })
    } else {

        // Cirando objeto com as informações da requisição POST
        const novoAluno = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            curso: req.body.curso,
            data_nascimento: req.body.data_nascimento,
            horario_curso: req.body.horario_curso,
            dia_curso: req.body.dia_curso
        }

        //Salvando objeto aluno no banco
        new Aluno(novoAluno).save().then(() => {
            req.flash("success_msg", "Aluno Cadastrado com Sucesso!")
            res.redirect('/admin/painel_alunos')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao cadastrar o aluno!")
            res.redirect("/admin")
        })
    }


})


module.exports = router