const express = require('express');
const routes = express.Router();

// Importar todos los controladores
const getAllVideoGames = require('../controllers/getAllVideoGames');
const getVideoGameName = require('../controllers/getVideoGameName');
const getVideoGameDetail = require('../controllers/getVideoGameDetail');
const postVideoGame = require('../controllers/postVideoGame');
const getAllGenres = require('../controllers/getAllGenres');

// Configurar las rutas
routes.get('/videogames', getAllVideoGames);
routes.get('/videogames/name', getVideoGameName);
routes.get('/videogames/:id', getVideoGameDetail);
routes.post('/videogames/create', postVideoGame);
routes.get('/genres', getAllGenres);

module.exports = routes;
