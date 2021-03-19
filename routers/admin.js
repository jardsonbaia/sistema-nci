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
    res.send('admin/painel_alunos')
})

// Rota que recebe os dados do cadastro e salva no banco
router.post('/cadastro_alunos/novo', (req, res) => {
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
        console.log("Aluno Cadastrado com sucesso!")
    }).catch((err) => {
        console.log("Erro ao Cadastrar o Aluno!", err)
    })
    //Tela de Feddback
    res.send(`Dados Salvos: ${novoAluno.nome} - ${novoAluno.telefone} - 
    ${novoAluno.curso} - ${novoAluno.data_nascimento} - 
    ${novoAluno.horario_curso} - ${novoAluno.dia_curso}`)
})


module.exports = router