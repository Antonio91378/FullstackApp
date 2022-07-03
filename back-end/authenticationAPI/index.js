require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();

/*
com o bloco abaixo eu permito a leitura de 
arquivos JSON
*/
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a authAPI" });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(422).json({ error: "o email é obrigatorio" });
    return;
  }
  if (!password) {
    res.status(422).json({ error: "o password é obrigatorio" });
    return;
  }
  //check if user exists
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).json({ error: "usuario n encontrado" });
  }
  //check if password match
  try {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({ msg: "senha invalida" });
    }
    if (checkPassword) {
      //autenticacao com o token
      try {
        const secret = process.env.TOKEN_HASH;
        const token = jwt.sign(
          {
            id: user._id,
          },
          secret
        );

        res.status(200).json({ msg: "Autenticacao sucedida", token });
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    }
  } catch (error) {
    return res.status(422).json({ error: "Senha incorreta" });
  }
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  //validacao
  if (!name) {
    res.status(422).json({ error: "o nome é obrigatorio" });
    return;
  }
  if (!email) {
    res.status(422).json({ error: "o email é obrigatorio" });
    return;
  }
  if (!password) {
    res.status(422).json({ error: "o password é obrigatorio" });
    return;
  }
  if (!confirmPassword) {
    res.status(422).json({ error: "o confirmPassword é obrigatorio" });
    return;
  }
  if (password !== confirmPassword) {
    res.status(422).json({ error: "As senham nao batem" });
    return;
  }

  //check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(422).json({ error: "plz use outro email" });
  }

  //trabalhando com salt e hashs para a senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(200).json({ msg: "usuario criado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ msg: "usuario nao autenticado" });
  }
  try {
    const secret = process.env.TOKEN_HASH;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido" });
  }
};
//exemplo de rota protegida
app.get("/rotasecreta", checkToken, async (req, res) => {
  res.status(200).json({ msg: "acesso permitido" });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@authapi.ipa08.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao mongoDB!");
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
