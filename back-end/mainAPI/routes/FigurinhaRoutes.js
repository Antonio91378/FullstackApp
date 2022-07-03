const router = require("express").Router();
const Figurinha = require("../models/Figurinha");
// rotas post da api 'POST'-> o verbo post quer dizer que eu trato os dados que chegam da requisicao, POST é o que chega
//o verbo post pode ser também quando eu quero enviar algo pra api
router.post("/", async (req, res) => {
  const { nome, ataque } = req.body;

  if (!nome) {
    res.status(422).json({ error: "o nome é eobrigatorio" });
    return;
  }
  if (!ataque) {
    res.status(422).json({ error: "o nome é eobrigatorio" });
    return;
  }

  const _figurinha = {
    nome,
    ataque,
  };
  try {
    //criando dados no db
    await Figurinha.create(_figurinha);
    //devolve status 201 caso sucesso na criacao de dados
    res.status(201).json({ msg: "figurinha criada com sucesso" });
  } catch (error) {
    //devolve status 500 caso haja erro
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const figurinhas = await Figurinha.find();
    res.status(200).json(figurinhas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Criando rotas dinamicas, nesse caso sera para poder coletar uma figurinha especifica com o seu id
router.get("/:id", async (req, res) => {
  //params.id reconhece o id fornecido no endPoint
  const id = req.params.id;
  try {
    //metodo findOne para achar um objeto apenas da controller
    //no mongoDB o id se chama _id!
    const figurinha = await Figurinha.findOne({ _id: id });
    if (!figurinha) {
      res.status(422).json({ error: "figurinha nao encontrada" });
      return;
    }
    res.status(200).json(figurinha);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Editando valore com o put-> que muda o objeto por completo e com o patch -> que o muda parcialmente ^^
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, ataque } = req.body;
  const figurinha = {
    nome,
    ataque,
  };
  try {
    //adivinha o nome do metodo, rs
    const figurinhaAtualizada = await Figurinha.updateOne(
      { _id: id },
      figurinha
    );
    //MatchedCound = propriedade que revela o numero de campos atualizados
    if (figurinhaAtualizada.matchedCount === 0) {
      res
        .status(422)
        .json({ error: "nao foi possivel atualizar os campos indicados" });
    }
    res.status(200).json(figurinha);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Deletando Figurinhas no db
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const figurinha = await Figurinha.findOne({ _id: id });
  if (!figurinha) {
    res.status(422).json({ error: "figurinha nao encontrada" });
  }
  try {
    await Figurinha.deleteOne({ _id: id });
    res.status(200).json({ msg: "Figurinha deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
