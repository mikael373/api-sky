const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  senha: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  token: {
    type: String,
    min: 6,
    max: 1024,
  },
  telefones: [
      {
        numero: {
          type : String,
          min: 8,
          max: 9
        },
        ddd: {
          type: String,
          min: 2,
          max: 2
        }
      }
      ],
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
