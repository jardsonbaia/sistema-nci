const  mongoose  = require("mongoose");
const Schema = mongoose.Schema
const getDateNow = require('../helpers/getData')

const AlunoSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    curso: {
        type: String,
        require: true
    },
    data_nascimento: {
        type: String,
        require: false
    },
    horario_curso: {
        type: String,
        require: true
    },
    dia_curso: {
        type: String,
        require: true
    },
    data_registro: {
        type: String,
        default: getDateNow
    },
    data_alteracao: {
        type: Date,
        require: false
    }
})

mongoose.model('aluno', AlunoSchema)