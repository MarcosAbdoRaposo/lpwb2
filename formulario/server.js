// Importa o framework Express
const express = require("express");
// Importa o body-parser para tratar dados de formulários POST
const bodyParser = require("body-parser");

const path = require('path')

const app = express();
const port = 3000;

// Configura o body-parser para ler dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como o HTML dos formulários)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para tratar o formulário GET
app.get("/processar-get", (req, res) => {
  const { nome, nota1, nota2 } = req.query;
  const media = (Number(nota1)+Number(nota2))/2;
  const situacao = media >= 6 ? "Aprovado" : (media >= 2 ? "Exame Final": "Reprovado" )
  console.log(`Situação ${situacao}`);
  res.send(`<h2>Dados recebidos via GET:</h2>
            <p>Nome  : ${nome}</p>
            <p>Nota 1: ${nota1}</p>
            <p>Nota 2: ${nota2}</p>
            <p>Média : ${media}</p>
            <p>Situação: ${situacao}</p>`);
});

// Rota para tratar o formulário POST
app.post("/processar-post", (req, res) => {
  const { nome, nota1, nota2 } = req.body;
  const media = (Number(nota1)+Number(nota2))/2;
  const situacao = media >= 6 ? "Aprovado" : (media >= 2 ? "Exame Final": "Reprovado" );
  res.send(`<h2>Dados recebidos via POST:</h2>
            <p>Nome  : ${nome}</p>
            <p>Nota 1: ${nota1}</p>
            <p>Nota 2: ${nota2}</p>
            <p>Média : ${media}</p>
            <p>Situação: ${situacao}</p>`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
