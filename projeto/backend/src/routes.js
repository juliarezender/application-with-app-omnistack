const { Router } = require('express');
const DevController = require('./DevControllers');
const SearchController = require('./SearchControllers');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros
// Query Params: request.query (Filtros, ordenação, paginação, ....)
// Route Params: request.params (Indentificar um recusro na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional) - dados hospedados na núvem

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;