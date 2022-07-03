//entidade Figurinha
const mongoose = require("mongoose");
//Cria a tabela de Figurinhas e os campos indicados
const Figurinha = mongoose.model("Figurinha", {
  nome: String,
  ataque: Number,
});

module.exports = Figurinha;
