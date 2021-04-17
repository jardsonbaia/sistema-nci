const { request } = require("express")
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/AlunoSchema')
const Aluno = mongoose.model('aluno')
const {eAdmin} = require('../helpers/eAdmin')
const {formatDate} = require('../helpers/formatDate')

router.get('/', eAdmin, (req, res) => {
    res.render('admin/index')
})


//Rota de cadastro
router.get('/cadastro_alunos', eAdmin, (req, res) => {
    res.render('admin/cadastro_alunos')
})

//Rota de painel dos alunos
router.get('/painel_alunos', eAdmin, (req, res) => {

    Aluno.find().lean().sort({data_nascimento:'asc'}).then((alunos) => {

        let qtd_basico = 0;
        let qtd_avan_1 = 0;
        let qtd_avan_2 = 0;
        let qtd_avan_3 = 0;
        let qtd_avan_kids = 0;

        alunos.forEach((aluno) => {
            if(aluno.curso == "Básico") {
                qtd_basico ++
            }
            if(aluno.curso == "Avançado 1") {
                qtd_avan_1 ++
            }
            if(aluno.curso == "Avançado 2") {
                qtd_avan_2 ++
            }
            if(aluno.curso == "Avançado 3") {
                qtd_avan_3 ++
            }
            if(aluno.curso == "Avançado Kids") {
                qtd_avan_kids ++
            }
        })

        const totais = {
            basico: qtd_basico,
            avan_1: qtd_avan_1,
            avan_2: qtd_avan_2,
            avan_3: qtd_avan_3,
            avan_kids: qtd_avan_kids,
            total: alunos.length
        }
        
        res.render('admin/painel_alunos', {alunos: alunos, qtd: totais})
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar os alunos!')
        res.redirect('/admin')
    })
})

// Rota para editar aluno
router.get('/painel_alunos/edit/:id', eAdmin, (req, res) => {
    Aluno.findOne({_id:req.params.id}).lean().then((aluno) => {
        res.render("admin/edit_alunos", {aluno: aluno})
    }).catch((err) => {
        req.flash("error_msg", "Este aluno não esxiste")
        res.redirect('/admin/painel_alunos')
    })

})

// Rota que recebe os dados do cadastro e salva no banco
router.post('/cadastro_alunos/novo', eAdmin, (req, res) => {

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

        // Criando objeto com as informações da requisição POST
        const novoAluno = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            curso: req.body.curso,
            data_nascimento: formatDate(req.body.data_nascimento),
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

// Rota de edição de alunos
router.post("/painel_alunos/edit", eAdmin, (req, res) => {
    Aluno.findOne({_id: req.body.id}).then((aluno) => {
        

        aluno.nome = req.body.nome
        aluno.telefone = req.body.telefone
        aluno.curso = req.body.curso
        aluno.data_nascimento = req.body.data_nascimento
        aluno.horario_curso = req.body.horario_curso
        aluno.dia_curso = req.body.dia_curso
        
        aluno.save().then(() => {
            req.flash("success_msg", "Aluno editado com sucesso!")
            res.redirect("/admin/painel_alunos")
        }).catch((err) => {
            req.flash("error_msg", "Erro ao salvar edição do Aluno!")
            req.res("/admin/painel_alunos")
        })

    }).catch((err) => {
        console.log(err)
        req.flash("error_msg", "Erro ao editar o aluno!")
        res.redirect('/admin/painel_alunos')
    })
})

router.post('/painel_alunos/deletar', eAdmin, (req, res) => {
    Aluno.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Aluno deletado!')
        res.redirect('/admin/painel_alunos')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar o Aluno!')
        res.redirect('/admin/painel_alunos')
    })
})


module.exports = router