const express = require("express");
const routes = require("./routes")
const cors = require("cors")
const  app = express();
const {errors} = require('celebrate');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors())
/*
    MétodosHTTP:
        Get: Buscar uma informação do Back-End
        Post: Criar uma informação no back-end
        Put: Alterar uma informação no back-end
        Delete: Deletar uma informação no back-end

    Tipos de parametros:
        Query Params: parametros nomeados enviados na rota após ? (Filtros,paginação)
        Routh Params: paramtros utilizados para identificar recursos
        Request params: corpo da requisição, utilizado para criar ou alterar recursos


*/

module.exports = app;