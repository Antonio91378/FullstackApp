//entidade Figurinha
const mongoose = require("mongoose");
//Cria a tabela de Figurinhas e os campos indicados
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

module.exports = User;
