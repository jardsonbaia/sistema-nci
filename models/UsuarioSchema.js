const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true,
    },
    data_nascimento: {
        type: String,
        required: true,
    },
    data_registro: {
        type: String,
        default: 'Hoje'
    },
    admin: {
        type: Number,
        default: 0
    }
})



mongoose.model("usuarios", Usuario)