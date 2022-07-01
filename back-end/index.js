require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
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
// importando rotas
const FigurinhaRoutes = require("./routes/FigurinhaRoutes");

app.use("/figurinha", FigurinhaRoutes);
// desenvolver rota inicial
app.get("/", (req, res) => {
  // mostrar req
  res.json({ message: " Oieeeee" });
});

/*mongodb secrets:
mongodb+srv://espartacos91378:Frankbob12345!@dbformyapi.tyy2l.mongodb.net/?retryWrites=true&w=majority
Frankbob12345!
*/

//escrever em uma porta
//espera conectar no banco de dados antes de liberar o endPoint
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dbformyapi.tyy2l.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao mongoDB!");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
